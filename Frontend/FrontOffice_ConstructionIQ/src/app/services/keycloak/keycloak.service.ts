import { Injectable } from '@angular/core';
import Keycloak from "keycloak-js";
import {UserProfile} from "./user-profile";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  private _keycloak: Keycloak | undefined;
  private _profile: UserProfile | undefined;

  constructor(private router: Router) {}

  get keycloak() {
    if(!this._keycloak){
      this._keycloak = new Keycloak({
        url:'http://localhost:9090',
        realm:'Pidev-ConstructionIQ',
        clientId:'Pidev-ConstructionIQ'
      });
    }
    return this._keycloak;
  }

  get profile(): UserProfile | undefined {
    return this._profile;
  }

  async init(): Promise<boolean> {
    try {
      console.log('Authenticating the user...');
      const authenticated = await this.keycloak.init({
        onLoad: 'login-required',
        pkceMethod: 'S256',
        checkLoginIframe: false
      });

      if (authenticated) {
        this._profile = (await this.keycloak.loadUserProfile()) as UserProfile;
        this._profile.token = this.keycloak.token;
        return true;
      } else {
        this.keycloak.login();
        return false;
      }
    } catch (error) {
      console.error('Keycloak initialization failed:', error);
      this.router.navigate(['/login']);
      return false;
    }
  }

  login() {
    return this.keycloak?.login();
  }

  logout() {
    return this.keycloak?.logout({
      redirectUri: window.location.origin
    });
  }
}
