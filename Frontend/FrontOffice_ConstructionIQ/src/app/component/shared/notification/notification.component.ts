// src/app/component/shared/notification/notification.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationService, Notification, NotificationType } from '../../../services/notification.service';

@Component({
  selector: 'app-notification',
  template: `
    <div *ngFor="let notification of notifications; let i = index" 
         class="notification-container" 
         [ngClass]="notification.type">
      <div class="notification-message">
        <i class="notification-icon fa" [ngClass]="getIcon(notification.type)"></i>
        <span>{{ notification.message }}</span>
      </div>
      <button class="notification-close" (click)="removeNotification(i)">×</button>
    </div>
  `,
  styles: [`
    .notification-container {
      position: fixed;
      top: 20px;
      right: 20px;
      min-width: 300px;
      max-width: 450px;
      padding: 15px;
      border-radius: 4px;
      color: #fff;
      box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 9999;
      transition: all 0.3s ease;
      margin-bottom: 10px;
      animation: slideIn 0.5s ease-out forwards;
    }
    
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    .notification-container.success {
      background-color: #28a745;
    }
    
    .notification-container.error {
      background-color: #dc3545;
    }
    
    .notification-container.info {
      background-color: #17a2b8;
    }
    
    .notification-container.warning {
      background-color: #ffc107;
      color: #212529;
    }
    
    .notification-message {
      display: flex;
      align-items: center;
      flex: 1;
    }
    
    .notification-icon {
      margin-right: 10px;
      font-size: 18px;
    }
    
    .notification-close {
      background: none;
      border: none;
      color: inherit;
      font-size: 20px;
      cursor: pointer;
      margin-left: 15px;
      padding: 0;
      line-height: 1;
    }
  `]
})
export class NotificationComponent implements OnInit, OnDestroy {
  notifications: Notification[] = [];
  private subscription: Subscription = new Subscription();
  
  constructor(private notificationService: NotificationService) { }
  
  ngOnInit(): void {
    this.subscription = this.notificationService.getNotifications().subscribe((notification: Notification) => {
      this.notifications.push(notification);
      
      if (notification.timeout && notification.timeout > 0) {
        setTimeout(() => {
          this.removeNotification(this.notifications.indexOf(notification));
        }, notification.timeout);
      }
    });
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  removeNotification(index: number): void {
    if (index >= 0 && index < this.notifications.length) {
      this.notifications.splice(index, 1);
    }
  }
  
  getIcon(type: NotificationType): string {
    switch (type) {
      case NotificationType.SUCCESS:
        return 'fa-check-circle';
      case NotificationType.ERROR:
        return 'fa-times-circle';
      case NotificationType.INFO:
        return 'fa-info-circle';
      case NotificationType.WARNING:
        return 'fa-exclamation-triangle';
      default:
        return 'fa-bell';
    }
  }
}