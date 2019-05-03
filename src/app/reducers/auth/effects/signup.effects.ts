import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/common/services/auth.service';
import * as Signup from './../actions/signup.action';

@Injectable()
export class SignupEffects {

  @Effect()
  signup$ = this.actions$
    .pipe(
      ofType(Signup.ActionTypes.Signup),
      mergeMap((action) => this.authService.register(action)
        .pipe(
          map(data => ({ type: !data['error']? Signup.ActionTypes.SignupSuccess: Signup.ActionTypes.SignupFailed, payload: data })),
          catchError(() => of({ type: Signup.ActionTypes.SignupFailed, payload: {error: true, message: "Operation failed. Please retry"} }))
        ))
      )
    ;

  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {}
}