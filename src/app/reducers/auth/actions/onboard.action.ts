import { Action } from '@ngrx/store';

export enum ActionTypes {
    GetUser = "[Onboard Screen] GetUser",
    GetUserSuccess = "[Onboard Screen] GetUserSuccess",
    Onboard = "[Onboard Screen] Onboard",
    OnboardSuccess = "[Onboard Screen] OnboardSuccess",
};

export class Onboard implements Action {
    readonly type = ActionTypes.Onboard;
    constructor(public payload: {
        firstname: string,
        lastname: string,
        dob: string,
        gender: string,
        introduced_by: string,
        street: string,
        city: string,
        state: number,
        country: number,
        nokfirstname: string,
        noklastname: string,
        nokphone: number,
        nokaddress: string,
        relationship: number,
    }) {}
}

export class GetUser implements Action {
    readonly type = ActionTypes.GetUser;
    constructor(public payload: {id: number}) {}
}

export class GetUserSuccess implements Action {
    readonly type = ActionTypes.GetUserSuccess;
    constructor(public payload: {
        firstname: string,
        lastname: string,
        dob: string,
        gender: string,
        introduced_by: string,
        street: string,
        city: string,
        state: number,
        country: number,
        nokfirstname: string,
        noklastname: string,
        nokphone: number,
        nokaddress: string,
        relationship: number,
    }) {}
}

export class OnboardSuccess implements Action {
    readonly type = ActionTypes.OnboardSuccess;
    constructor(public payload: {
        firstname: string,
        lastname: string,
        dob: string,
        gender: string,
        introduced_by: string,
        street: string,
        city: string,
        state: number,
        country: number,
        nokfirstname: string,
        noklastname: string,
        nokphone: number,
        nokaddress: string,
        relationship: number,
    }) {}
}

export type OnboardUnion = GetUser | Onboard | GetUserSuccess | OnboardSuccess;