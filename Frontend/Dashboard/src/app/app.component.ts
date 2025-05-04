
import {Component, OnInit} from "@angular/core";
import {KeycloakService} from "./keycloak.service";

@Component({
  selector: 'app-root',
  template: `
    <ng-container *ngIf="authorized; else loadingOrError">
      <router-outlet></router-outlet>
    </ng-container>
    <ng-template #loadingOrError>
      <p *ngIf="loading">Loading...</p>
      <p *ngIf="!loading && !authorized">You do not have access to this application.</p>
    </ng-template>
  `,
})
export class AppComponent implements OnInit {
  authorized = false;
  loading = true;

  constructor(private kc: KeycloakService ) {}
//TODO-PRIME
  async ngOnInit() {
    await this.kc.init();
    const roles = this.kc.getRoles();
    const port = window.location.port;

    if (roles.includes('ADMIN')) {
      if (port !== '4201') {
        window.location.href = 'http://localhost:4201';
        return; // Prevent further execution
      }
      this.authorized = true;
    } else if (roles.includes('USER')) {
      if (port !== '4200') {
        window.location.href = 'http://localhost:4200';
        return;
      }
      this.authorized = true;
    } else {
      this.authorized = false; // No permitted role
    }

    this.loading = false;
  }
}
