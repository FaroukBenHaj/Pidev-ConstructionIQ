import { Component } from '@angular/core';
interface Service {
  image: string;
  title: string;
  description: string;
  link: string;
}
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent {
  services: Service[] = [
    {
      image: 'assets/img/services/7.jpg',
      title: 'Construction Manager',
      description: 'Nullam ornare odio eu lacus tincidunt malesuada. Sed eu vestibulum elit. Curabitur tortor mi, eleifend ornare.',
      link: '#'
    },
    {
      image: 'assets/img/services/5.jpg',
      title: 'Construction Manager',
      description: 'Nullam ornare odio eu lacus tincidunt malesuada. Sed eu vestibulum elit. Curabitur tortor mi, eleifend ornare.',
      link: '#'
    },
    {
      image: 'assets/img/services/4.jpg',
      title: 'Construction Manager',
      description: 'Nullam ornare odio eu lacus tincidunt malesuada. Sed eu vestibulum elit. Curabitur tortor mi, eleifend ornare.',
      link: '#'
    },
    // Add other services similarly
  ];
}
