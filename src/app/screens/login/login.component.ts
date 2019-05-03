import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import { AuthService } from 'src/app/common/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup;
  resetFormGroup: FormGroup;
  username = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', Validators.required);
  loginForm: string;

  getErrorMessage() {
    return this.username.hasError('required') ? 'You must enter a value' :
        this.username.hasError('username') ? 'Not a valid email' :
            '';
  }
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.loginForm = 'login';
    this.loginFormGroup = new FormGroup({
      username: this.username, password: this.password
    });
    this.resetFormGroup = new FormGroup({
      email: new FormControl(''),
    })
  }

  toggleForm(form) {
    this.loginForm = form;
  }

  login(form) {
    if(this.loginFormGroup.status === 'VALID') {
      this.auth.requestToken(form).subscribe(
        () => {        
          this.auth.login()
            .subscribe( 
              user => {
                console.log(user, this.auth, this.auth.isAuthenticated())
                if(!this.auth.hasError && this.auth.isAuthenticated()) {
                  this.router.navigate(['dashboard']);
                }
              }
            )
        }
      )
    }
  }

}
