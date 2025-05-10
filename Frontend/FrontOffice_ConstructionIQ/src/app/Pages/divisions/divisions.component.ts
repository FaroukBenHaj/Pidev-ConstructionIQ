import { Component } from '@angular/core';
interface Division {
  icon: string;
  title: string;
  link: string;
}

@Component({
  selector: 'app-divisions',
  templateUrl: './divisions.component.html',
  styleUrls: ['./divisions.component.css']
})
export class DivisionsComponent {
  divisions: Division[] = [
    {
      icon: 'dd-icon icon-derrick-with-box-1',
      title: 'BRIDGE DIVISION',
      link: '#'
    },
    {
      icon: 'dd-icon icon-garden-fence',
      title: 'RAILROAD DIVISION',
      link: '#'
    },
    {
      icon: 'dd-icon icon-crane',
      title: 'INDUSTRIAL DIVISION',
      link: '#'
    }
  ];
}
