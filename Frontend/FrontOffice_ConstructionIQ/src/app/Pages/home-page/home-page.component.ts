import {AfterViewInit, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnInit {
  // Data for your sections
  divisions = [
    {
      title: 'BRIDGE DIVISION',
      icon: 'dd-icon icon-derrick-with-box-1',
      spacer: { desktop: 0, mobi: 60, smobi: 60 }
    },
    // Add other divisions
  ];

  services = [
    {
      title: 'Construction Manager',
      image: 'assets/img/services/7.jpg',
      description: 'Nullam ornare odio eu lacus tincidunt malesuada. Sed eu vestibulum elit.'
    },
    // Add other services
  ];

  // Add other data properties for projects, testimonials, etc.

  constructor() { }

  ngOnInit(): void {
    // Initialize any required scripts
    this.initScripts();
  }

  private initScripts() {
    // Initialize any jQuery plugins here if needed
    // Consider replacing with Angular alternatives
  }

}
