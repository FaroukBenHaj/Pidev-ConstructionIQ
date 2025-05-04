import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthentificationService} from "../../services/services/authentification.service";

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.css']
})
export class ActivateAccountComponent {
message: string ='';
isOkay:boolean =true;
submitted:boolean=false;
constructor(
  private router:Router,
  private authservice:AuthentificationService
) {
}

  onCodeCompleted(token: string) {
  this.confirmAccount(token);
  }

  redirectToLogin() {
  this.router.navigate(['login'])
  }

  private confirmAccount(token: string) {
  this.authservice.confirm({
    token
  }).subscribe({
    next: (): void => {
      this.message = "Your account has been created successfully ! \n  Now you can log in "
      this.submitted=true;
    },
    error: (): void =>{
      this.message = "Token is expired or invalid !  "
      this.submitted=true;
      this.isOkay=false;
    }
  });
  }
}
