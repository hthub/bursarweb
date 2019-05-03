import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularMaterialModule } from './angular-material.module';
import { NavbarComponent } from './nav/navbar/navbar.component';
import { FooterComponent } from './nav/footer/footer.component';
import { LoginComponent } from './screens/login/login.component';
import { OnboardComponent } from './screens/onboard/onboard.component';
import { SignupComponent } from './screens/signup/signup.component';
import { BiodataComponent } from './screens/biodata/biodata.component';
import { AddressComponent } from './screens/address/address.component';
import { NextofkinComponent } from './screens/nextofkin/nextofkin.component';
import { BankAccountComponent } from './screens/bank-account/bank-account.component';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { AuthService } from './common/services/auth.service';
import { HttpService } from './common/services/http.service';
import { DashboardComponent } from './screens/dashboard/dashboard.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { authReducer } from './reducers/auth/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { SignupEffects } from './reducers/auth/effects/signup.effects';
import { Utility } from './common/utilities/Utility';
import { OnboardEffects } from './reducers/auth/effects/onboard.effects';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    OnboardComponent,
    SignupComponent,
    BiodataComponent,
    AddressComponent,
    NextofkinComponent,
    BankAccountComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, { metaReducers } ),
    EffectsModule.forRoot([AppEffects, SignupEffects, OnboardEffects]),
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [HttpService, AuthService, Utility],
  bootstrap: [AppComponent]
})
export class AppModule { }
