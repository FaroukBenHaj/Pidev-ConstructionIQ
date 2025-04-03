import { Component } from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FrontOffice_ConstructionIQ';

  hideHeaderFooter = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Define routes where header/footer should be hidden
        this.hideHeaderFooter = ['/login', '/register' , '/activate-account'].includes(event.url);
      }
    });
  }
}
