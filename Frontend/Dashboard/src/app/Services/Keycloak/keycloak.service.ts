import { Injectable } from '@angular/core';
import Keycloak from "keycloak-js";
import {UserProfile} from "./user-profile";

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  private _keycloak: Keycloak | undefined;
  private initialized = false;

  get keycloak() {
    if(!this._keycloak){
      this._keycloak = new Keycloak({
        url:'http://localhost:9090',
        realm:'Esprit-project',
        clientId:'Pidev-ConstructionIQ'
      });
    }
    return this._keycloak;
  }

  private _profile: UserProfile | undefined;

  get profile(): UserProfile | undefined {
    return this._profile;
  }
  /*
    async init() {
      const authenticated = await this.keycloak.init({
        onLoad: 'login-required'});

      if (authenticated) {
        this._profile = (await this.keycloak.loadUserProfile()) as UserProfile;
        this._profile.token = this.keycloak.token || '';
      }
    }*/
  async init(): Promise<boolean> {
    if (this.initialized) {
      return true;
    }
    try {
      await this.keycloak.init({
        onLoad: 'login-required',
        checkLoginIframe: false,
      });
      this.initialized = true;
      return true;
    } catch (error) {
      console.error('Keycloak init failed', error);
      throw error;
    }
  }

  getRoles(): string[] {
    return this.keycloak.tokenParsed?.realm_access?.roles || [];
  }
  login() {
    return this.keycloak.login();
  }


  isLoggedIn(): boolean {
    return !!this.keycloak.token;
  }

  logout(): void {
    this.keycloak.logout();
  }

  getUserRoles() {

  }
}
