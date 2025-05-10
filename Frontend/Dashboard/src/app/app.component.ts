import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit {
  // We no longer need these:
  // authorized = false;
  // loading = true;

  constructor() {}

  // OnInit is optional now, you can remove it entirely if you like.
  ngOnInit() {
    // Nothing to do here—just render the app immediately
  }
}
