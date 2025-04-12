import { Component } from '@angular/core';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.css']
})
export class HeroSectionComponent {
  // You can make these dynamic
  slides = [
    { image: '../assets/img/slider/10.jpg' },
    { image: 'assets/img/slider/11.jpg' },
    { image: 'assets/img/slider/12.jpg' }
  ];
}
