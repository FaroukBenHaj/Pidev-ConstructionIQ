import {CanActivateFn, Router} from '@angular/router';
import {KeycloakService} from "../keycloak/keycloak.service";
import {inject} from "@angular/core";

//protects routes by checking authentication status before allowing access

export const authGuard: CanActivateFn = (route, state) => {
  //Checks if the user's token is expired
  const  keycloakService : KeycloakService = inject(KeycloakService);
  const router: Router = inject(Router);
  if(keycloakService.keycloak?.isTokenExpired()){
    router.navigate(['login']);
    return false;
  }
  return true;
};
// this function is a standalone fn .
