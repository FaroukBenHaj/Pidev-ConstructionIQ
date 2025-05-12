import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {KeycloakService} from "../../services/keycloak/keycloak.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(
    private router : Router,
    private keycloak : KeycloakService
  ){}

  goToHome() {
    this.router.navigate(['/home']);
  }

  goToUploadProject() {
    this.router.navigate(['/upload-project']);
  }
  logout() {
    this.keycloak.logout();
  }
}
