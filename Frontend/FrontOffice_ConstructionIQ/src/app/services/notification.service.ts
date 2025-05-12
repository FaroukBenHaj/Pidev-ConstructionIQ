import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export enum NotificationType {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
  WARNING = 'warning'
}

export interface Notification {
  type: NotificationType;
  message: string;
  timeout?: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new Subject<Notification>();
  
  constructor() { }
  
  getNotifications(): Observable<Notification> {
    return this.notificationSubject.asObservable();
  }
  
  success(message: string, timeout: number = 5000): void {
    this.showNotification({
      type: NotificationType.SUCCESS,
      message,
      timeout
    });
  }
  
  error(message: string, timeout: number = 5000): void {
    this.showNotification({
      type: NotificationType.ERROR,
      message,
      timeout
    });
  }
  
  info(message: string, timeout: number = 5000): void {
    this.showNotification({
      type: NotificationType.INFO,
      message,
      timeout
    });
  }
  
  warning(message: string, timeout: number = 5000): void {
    this.showNotification({
      type: NotificationType.WARNING,
      message,
      timeout
    });
  }
  
  private showNotification(notification: Notification): void {
    this.notificationSubject.next(notification);
  }
}