import { Action } from '@ngrx/store';

export enum ActionTypes {
  Signin = '[Signin Screen] Signin',
}

export class Signin implements Action {
  readonly type = ActionTypes.Signin;

  constructor(public payload: { username: string; password: string }) {}
}

export type Union = Signin;