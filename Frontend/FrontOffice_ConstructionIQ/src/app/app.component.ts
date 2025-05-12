import { filter } from 'rxjs/operators';
import { Router, NavigationEnd, Event } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import {Component, OnInit} from "@angular/core";
import {KeycloakService} from "./services/keycloak/keycloak.service";

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css'],
//   animations: [
//     trigger('overlayContentAnimation', [
//       transition(':enter', [
//         style({ opacity: 0 }),
//         animate('300ms', style({ opacity: 1 }))
//       ]),
//       transition(':leave', [
//         animate('300ms', style({ opacity: 0 }))
//       ])
//     ])
//   ]



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
  title = 'FrontOffice_ConstructionIQ';
  showHeaderAndFooter: boolean = true;

  constructor(private router: Router , private kc: KeycloakService) {
    this.router.events
      .pipe(
        filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        console.log('Current URL:', event.url); 
        this.showHeaderAndFooter = !(event.url.includes('/upload-project') || event.url.includes('/project-list')|| event.url.includes('/edit-project')
        || event.url.includes('/gantt')|| event.url.includes('/weather/1'));
        console.log('Show Header and Footer:', this.showHeaderAndFooter); 
      });}
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
