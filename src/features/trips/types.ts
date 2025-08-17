export interface TripData {
  userId: string;
  startTime: string;
  stopTime: string | null;
  driveTime: number;
  touchCount: number;
}