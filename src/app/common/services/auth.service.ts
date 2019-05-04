import { Injectable } from "@angular/core";
import { HttpService } from './http.service';
import appConstants from './../config/appConstants';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap, flatMap, map, subscribeOn } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/User';
import { Biodata } from '../models/Biodata';


@Injectable()

export class AuthService {
    currentUser: User;
    newAccount: any;
    message: string;
    hasError: boolean;
    errorMessage: string;
    biodata;
    address;
    nextofkin;
    bankAccount;
    accessToken: string;
    constructor(private server: HttpService) {
        this.newAccount = {};
    }

    register(data) {
        return this.server.post(appConstants.BASE_URL + appConstants.SIGNUP_URL, data.payload)
            .pipe(
                tap(
                resp => {
                    this.message = resp['message'];
                    this.hasError = resp['error'];
                    if(!resp['error'] ) {
                        this.newAccount = resp['data'];
                    } else {

                    }
                },
                error => {
                    this.hasError = true;
                    console.log(error);
                }
            ));
    }

    isAuthenticated() {
        return this.currentUser.isUser();
    }

    isSetup(): boolean {
        return this.currentUser.biodata.isSetup();
    }

    isError() {
        return this.hasError;
    }

    setNewAccount(account) {
        this.newAccount = Object.assign(this.newAccount, account);
    }

    requestToken(account) {
        const auth = {
            grant_type: "password",
            client_id: appConstants.CLIENT_ID,
            client_secret: appConstants.CLIENT_SECRET,
        };
        const data = Object.assign(account, auth);
        return this.server.post(appConstants.BASE_URL + appConstants.REQUEST_TOKEN, data)
            .pipe(
                tap(
                    resp => {
                        if(resp && resp['access_token']) {
                            this.accessToken = resp['access_token'];
                        }
                    },
                    error => {
                        this.hasError = true;
                        this.message = "Invalid username or password!";
                    }
                )
            );
    }

    login() {
        this.hasError = false;
        this.message = "";
        return this.server.get(appConstants.BASE_URL + appConstants.SIGNIN_URL, this.accessToken)
            .pipe(
                tap (
                    user => {
                        if(user) {
                            const biodata = new Biodata(
                                user['biodata']['user_id'],
                                user['biodata']['firstname'],
                                user['biodata']['lastname'],
                                new Date(user['biodata']['dob']),
                                user['biodata']['gender'],
                                user['biodata']['introduced_by']
                            )
                            this.currentUser = new User(user['id'], user['email'], biodata);
                            this.hasError = false;
                        }
                    },
                    error => {
                        this.hasError = true;
                        this.message = "Invalid username or password!";
                    }
                )
            )
    }

    getUser(payload) {
        console.log(payload)
        return this.server.get(appConstants.BASE_URL + appConstants.GET_USER_URL + '/' + payload.id)
        .pipe(
            tap(
                resp => {
                    if(!resp['error'] ) {
                        this.currentUser = resp['data'];
                    }
                }
            )
        );
    }

    processOnboard(form) {
        //const data = {...form, user_id: uid};
        console.log(form)
        return this.server.post(appConstants.BASE_URL + appConstants.ONBOARD_URL, form)
            .pipe(
                tap(
                    resp => {
                        this.message = resp['message'];
                        this.hasError = resp['error'];
                        if(!resp['error'] ) {
                            this.currentUser = resp['data'];
                        }
                    },
                    error => this.hasError = true,
                )
            );
        
    }

}