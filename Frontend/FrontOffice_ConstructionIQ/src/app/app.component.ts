import { Component } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Router, NavigationEnd, Event } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FrontOffice_ConstructionIQ';
  showHeaderAndFooter: boolean = true;

  constructor(private router: Router) {
    this.router.events
      .pipe(
        filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        console.log('Current URL:', event.url); 
        this.showHeaderAndFooter = !(event.url.includes('/upload-project') || event.url.includes('/project-list')|| event.url.includes('/edit-project')
        || event.url.includes('/gantt'));
        console.log('Show Header and Footer:', this.showHeaderAndFooter); 
      });
  }
}
