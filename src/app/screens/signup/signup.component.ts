import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/common/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as Signup from './../../reducers/auth/actions/signup.action'; 
import { AuthState } from 'src/app/reducers/auth/auth.reducer';
import { Utility } from 'src/app/common/utilities/Utility';

@Component({
  selector: 'auth-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupFormGroup: FormGroup;
  errorMessage: string;
  signup$: Observable<AuthState> = this.store.select(state => state.auth);
  auth: any;

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router,
    private store: Store<{auth: AuthState}>,
    private utility: Utility) { }

  ngOnInit() {
    this.signupFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  signup(form) {
    this.store.dispatch({ type: Signup.ActionTypes.Signup, payload: form });
    this.signup$.subscribe( auth => {
      this.auth = auth;
      console.log(auth)
      if(auth && auth.error === false && this.utility.isset(auth.data['id'])) {
          this.router.navigate(['/onboard', auth.data['id']]);
      } 
    });
    /*this.auth.register(form).subscribe( resp => {
      console.log(form, resp)
      console.log(this.auth.currentUser, this.auth.hasError, this.auth.message, this.auth.newAccount);
       */
    
  }

}
