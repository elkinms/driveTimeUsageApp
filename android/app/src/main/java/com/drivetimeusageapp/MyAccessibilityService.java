package com.drivetimeusageapp;

import android.accessibilityservice.AccessibilityService;
import android.accessibilityservice.AccessibilityServiceInfo;
import android.util.Log;
import android.view.accessibility.AccessibilityEvent;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class MyAccessibilityService extends AccessibilityService {

    private static final String TAG = "ACCESS_LOG";

    private static ReactApplicationContext reactContext;

    // Debug switch: keep events flowing regardless of driving flag
    private static final boolean GATE_BY_DRIVING = false;

    // Throttle noisy 2048 logs
    private long lastContentChangedTs = 0L;
    private static final long CONTENT_CHANGED_MIN_GAP_MS = 120;

    public static void setReactContext(ReactApplicationContext context) {
        reactContext = context;
        Log.d(TAG, "ReactContext manually set");
    }

    @Override
    protected void onServiceConnected() {
        super.onServiceConnected();
        Log.d(TAG, "Service connected");

        AccessibilityServiceInfo info = new AccessibilityServiceInfo();
        info.eventTypes =
                AccessibilityEvent.TYPE_WINDOW_CONTENT_CHANGED   // 2048: UI pulse
              | AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED     // 32: window changes
              | AccessibilityEvent.TYPE_TOUCH_INTERACTION_START
              | AccessibilityEvent.TYPE_TOUCH_INTERACTION_END
              | AccessibilityEvent.TYPE_VIEW_CLICKED;            // taps as clicks

        info.feedbackType = AccessibilityServiceInfo.FEEDBACK_GENERIC;
        info.notificationTimeout = 80;

        info.flags =
                AccessibilityServiceInfo.FLAG_REPORT_VIEW_IDS
              | AccessibilityServiceInfo.FLAG_RETRIEVE_INTERACTIVE_WINDOWS;

        setServiceInfo(info);
    }

    @Override
    public void onAccessibilityEvent(AccessibilityEvent event) {
        if (event == null) return;

        if (GATE_BY_DRIVING && !isDrivingActive()) return;

        final int type = event.getEventType();
        final String pkg = event.getPackageName() != null ? event.getPackageName().toString() : "unknown";
        final long ts = event.getEventTime();

        switch (type) {
            case AccessibilityEvent.TYPE_TOUCH_INTERACTION_START:
            case AccessibilityEvent.TYPE_TOUCH_INTERACTION_END:
            case AccessibilityEvent.TYPE_VIEW_CLICKED:
                Log.d(TAG, "Event=" + type + " pkg=" + pkg);
                emitToJs(type, pkg, ts);
                break;

            case AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED:
                Log.d(TAG, "Event=" + type + " pkg=" + pkg);
                break;

            case AccessibilityEvent.TYPE_WINDOW_CONTENT_CHANGED: {
                long now = System.currentTimeMillis();
                if (now - lastContentChangedTs >= CONTENT_CHANGED_MIN_GAP_MS) {
                    lastContentChangedTs = now;
                    Log.d(TAG, "Event=" + type + " pkg=" + pkg);
                }
                // no emit to JS for 2048
                break;
            }

            default:
                // ignore others
        }
    }

    @Override
    public void onInterrupt() {
        Log.d(TAG, "Service interrupted");
    }

    private boolean isDrivingActive() {
        return getSharedPreferences("drive_prefs", MODE_PRIVATE)
                .getBoolean("isDriving", false);
    }

    private void emitToJs(int type, String pkg, long ts) {
        if (reactContext == null) return;
        try {
            WritableMap m = Arguments.createMap();
            m.putInt("type", type);
            m.putString("package", pkg);
            m.putDouble("timestamp", ts);
            reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("DriveTouchEvent", m);
        } catch (Exception e) {
            Log.w(TAG, "emitToJs failed", e);
        }
    }
}
