import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/common/services/auth.service';
import * as Signup from './../actions/signup.action';
import * as Onboard from '../actions/onboard.action';

@Injectable()
export class OnboardEffects {

  @Effect()
  getuser$ = this.actions$
    .pipe(
      ofType(Onboard.ActionTypes.GetUser),
      mergeMap((action) => this.authService.getUser(action['payload'])
        .pipe(
          map(data => ({ type: !data['error']? Onboard.ActionTypes.GetUserSuccess: Signup.ActionTypes.SignupFailed, payload: data['data'] })),
          catchError(() => EMPTY),
        ))
      );

  @Effect()
  onboard$ = this.actions$
    .pipe(
      ofType(Onboard.ActionTypes.Onboard),
      mergeMap(action => this.authService.processOnboard(action['payload'])
        .pipe(
          map(data => ({type: !data['error']? Onboard.ActionTypes.OnboardSuccess: Signup.ActionTypes.SignupFailed, payload: data['data']})),
          catchError(() => EMPTY)
        ))
    );

  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {}
}