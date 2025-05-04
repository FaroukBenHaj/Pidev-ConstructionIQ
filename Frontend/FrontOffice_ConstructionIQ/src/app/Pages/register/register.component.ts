import { Component } from '@angular/core';
import {RegistrationRequest} from "../../services/models/registration-request";
import {Router} from "@angular/router";
import {AuthentificationService} from "../../services/services/authentification.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerRequest: RegistrationRequest ={ email:'' , firstName:'' ,lastName:'' , password:''};
  errorMsg: Array<string> =[];

    constructor(
      private router: Router,
      private authService: AuthentificationService
    ) {
    }

  register_user() {
  this.errorMsg=[];
  this.authService.register({
    body: this.registerRequest
  }).subscribe({
    next: ():void => {
      this.router.navigate(['activate-account']);
    },
    error: (err):void =>{
      this.errorMsg = err.error.validationErrors;
    }
  })
  }

  login() {
  this.router.navigate(['login'])
  }
}
