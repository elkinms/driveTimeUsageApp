package com.drivetimeusageapp;

import android.content.Intent;
import android.provider.Settings;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class OpenAccessibilityService extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;

    public OpenAccessibilityService(ReactApplicationContext context) {
        super(context);
        this.reactContext = context;
    }

    @Override
    public String getName() {
        return "OpenAccessibilityService";
    }

    @ReactMethod
    public void open() {
        Intent intent = new Intent(Settings.ACTION_ACCESSIBILITY_SETTINGS);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        reactContext.startActivity(intent);
    }

    @ReactMethod
    public void setContextManually() {
        MyAccessibilityService.setReactContext(reactContext);
    }
}
