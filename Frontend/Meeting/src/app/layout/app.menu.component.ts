import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
                    { label: 'Meetings List', icon: 'pi pi-fw pi-list', routerLink: ['/meeting'] },
                    { label: 'Add Meeting', icon: 'pi pi-fw pi-calendar', routerLink: ['/add-meeting'] },
                    { label: 'Manage Attendees', icon: 'pi pi-fw pi-users', routerLink: ['/attendee'] },
                    { label: 'Mistral', icon: 'pi pi-fw pi-comments', routerLink: ['/mistral'] },
                ]
            },
        ];
    }
}
