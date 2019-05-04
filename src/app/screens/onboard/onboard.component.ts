import { Component, OnInit, NgModule } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/common/services/auth.service';
import { Store } from '@ngrx/store';
import { AuthState } from 'src/app/reducers/auth/auth.reducer';
import * as Onboard from 'src/app/reducers/auth/actions/onboard.action';
import { Utility } from 'src/app/common/utilities/Utility';

@Component({
  selector: 'app-onboard',
  templateUrl: './onboard.component.html',
  styleUrls: ['./onboard.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})

export class OnboardComponent implements OnInit {

  signupFormGroup: FormGroup;
  biodataFormGroup: FormGroup;
  addressFormGroup: FormGroup;
  nextofkinFormGroup: FormGroup;
  bankaccountFormGroup: FormGroup;
  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  });
  years: Int32List;
  months: Array<object>;
  days: Int32List;
  intros: Array<string>;
  states: Array<Object>;
  genders: Array<string>;
  auth$ = this.store.select(state => state.auth);

  constructor(private _formBuilder: FormBuilder, 
        private route: ActivatedRoute,
        private auth: AuthService,
        private router: Router,
        private store: Store<{auth: AuthState}>,
        private utility: Utility,
      ) {}

  ngOnInit() {
    this.store.dispatch({type: Onboard.ActionTypes.GetUser, payload: {id: this.route.snapshot.paramMap.get('id')}})
    this.biodataFormGroup = this._formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      day: ['', Validators.required],
      month: ['', Validators.required],
      year: ['', Validators.required],
      gender: ['', Validators.required],
      introduced_by: ['',],
    });
    this.addressFormGroup = this._formBuilder.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
    });
    this.nextofkinFormGroup = this._formBuilder.group({
      nokfirstname: ['', Validators.required],
      noklastname: ['', Validators.required],
      nokphone: ['', Validators.required],
      nokaddress: ['', Validators.required],
      relationship: ['', Validators.required],
    });
    this.bankaccountFormGroup = this._formBuilder.group({
      account_name: ['', Validators.required],
      account_number: ['', Validators.required],
      bank_name: ['', Validators.required],
      bank_branch: [''],
      bvn: ['', Validators.required],
    });
    const account = {
      id: this.route.snapshot.paramMap.get('id'),
      username: this.route.snapshot.paramMap.get('email'),
      phone: this.route.snapshot.paramMap.get('phone'),
      password: this.route.snapshot.paramMap.get('password'),
    };
    
    this.auth.setNewAccount(account);

    this.setupDob();
    this.auth$.subscribe( auth => {
      console.log(auth.onboard)
      if(auth.onboard.hasOwnProperty('id') && this.utility.isset(auth.onboard.firstname) && this.utility.isset(auth.onboard.lastname) && auth.onboard.firstname !== "" && auth.onboard.lastname !== "" )
          this.router.navigate(['/dashboard']);
      
    } )
  }

  submit() {
    const dob = `${this.biodataFormGroup.value.year}-${this.biodataFormGroup.value.month.padStart(2, 0)}-${this.biodataFormGroup.value.day.padStart(2, 0)}`;
    const data = {
      ...this.biodataFormGroup.value,
      ...this.addressFormGroup.value,
      ...this.nextofkinFormGroup.value,
      ...this.bankaccountFormGroup.value,
      dob
    };

    this.store.dispatch({type: Onboard.ActionTypes.Onboard, payload: {...data, user_id: this.auth.newAccount.id}})
    this.auth$.subscribe( user => {
      if(!this.auth.hasError)
          this.router.navigate(['/dashboard']);
      
    } )
    /*this.auth.processOnboard(this.auth.newAccount.id, data).
      subscribe( response => {
        if(!this.auth.hasError)
          this.router.navigate(['/dashboard']);
      }) */
  }

  setupDob() {
    let fullYear = (new Date()).getFullYear() - 18;
    let minYear = fullYear - 50;
    this.months = [
      {id: 1, name: 'January'},
      {id: 2, name: 'February'},
      {id: 3, name: 'March'},
      {id: 4, name: 'April'},
      {id: 5, name: 'May'},
      {id: 6, name: 'June'},
      {id: 7, name: 'July'},
      {id: 8, name: 'August'},
      {id: 9, name: 'September'},
      {id: 10, name: 'October'},
      {id: 11, name: 'November'},
      {id: 12, name: 'December'}
    ]
    let y = [];
    for(let i=fullYear; i > minYear; i--) {
      y.push(i);
    }
    let d = [];
    for(let i=1; i<=31; i++) {
      d.push(i);
    }
    let m = [];
    for(let i=1; i<=12; i++) {
      m.push(i);
    }
    this.years = y;
    this.days = d;
    this.intros = [
      'Friend', 'Search engine', 'Promoters', 'Others'
    ];
    this.states = [
      {id: 1, name: 'Lagos'},
      {id: 2, name: 'Abuja'},
      {id: 3, name: 'Osun'},
    ];
    this.genders = ['Male', 'Female'];
  }

}
