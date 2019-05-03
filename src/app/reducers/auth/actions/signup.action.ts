import { Action } from '@ngrx/store';

export enum ActionTypes {
    Signup = '[Signup Screen] Signup', 
    SignupSuccess = '[Signup Screen] SignupSucess',
    SignupFailed = '[Signup Screen] SignupFailed', 
};

export class Signup implements Action {
    readonly type = ActionTypes.Signup;

    constructor(public payload: { email: string, phone: number, username?: string, password: string,  }) {}
}

export class SignupSuccess implements Action {
    readonly type = ActionTypes.SignupSuccess;
    constructor(public payload: { error: boolean, message: string, data: object }) {}
}

export class SignupFailed implements Action {
    readonly type = ActionTypes.SignupFailed;
    constructor(public payload: { error: boolean, message: string }) {}
}

export type SignupUnion = Signup | SignupSuccess | SignupFailed;