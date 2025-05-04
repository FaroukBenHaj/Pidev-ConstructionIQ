import { Component } from '@angular/core';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.css']
})
export class HeroSectionComponent {
  // You can make these dynamic
  slides = [
    { image: '.assets/img/slider/7.jpg' },
    { image: 'assets/img/slider/6.jpg' },
    { image: 'assets/img/slider/1.jpg' }
  ];
}
