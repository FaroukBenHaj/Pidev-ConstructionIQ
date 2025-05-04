import { Component } from '@angular/core';
import {LoginAttempt} from "../LoginAttempt";
import {AnomalyDetectionService} from "../anomaly-detection.service";

@Component({
    selector: 'app-login-monitor',
    templateUrl: './login-monitor.component.html'
})
export class LoginMonitorComponent {
    result: string = '';

    constructor(private anomalyService: AnomalyDetectionService) {}

    checkForAnomalies(attempts: LoginAttempt[]) {
        this.anomalyService.detectAnomaly(attempts).subscribe(
            response => {
                this.result = response;
                if (response.includes('Suspicious')) {
                    // Take additional actions like showing alert
                    alert('Suspicious activity detected!');
                }
            },
            error => {
                console.error('Error detecting anomalies:', error);
            }
        );
    }
}
