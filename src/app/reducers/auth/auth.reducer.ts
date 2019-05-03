import * as Signup from './actions/signup.action';
import * as Signin from './actions/signin.action';
import * as Onboard from './actions/onboard.action';
import { initialState } from './initialState';

// get the state structure
export interface AuthState {
    error: boolean,
    message: string,
    data: object,
    signup: {
        email: string,
        phone: number,
        password: string,
        username?: string,
    },
    signin: {
        username: string,
        password: string,
    },
    onboard: {
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
    },
    user: object,
}

export function authReducer(
    state = initialState,
    action: Signup.SignupUnion | Signin.Union | Onboard.OnboardUnion
): AuthState {
    switch(action.type){
        case Signup.ActionTypes.Signup:
            return {...state, signup: action.payload};
        case Signup.ActionTypes.SignupSuccess:
            return {...state, data: action.payload.data, error: action.payload.error, message: action.payload.message};
        case Signup.ActionTypes.SignupFailed:
            return {...state, error: action.payload.error, message: action.payload.message};
        case Signin.ActionTypes.Signin:
            return {...state, signin: action.payload};
        case Onboard.ActionTypes.GetUserSuccess:
            const user = {
                firstname: action.payload.firstname,
                lastname: action.payload.lastname,
                dob: action.payload.dob,
                gender: action.payload.gender,
                introduced_by: action.payload.introduced_by,
                street: action.payload.street,
                city: action.payload.city,
                state: action.payload.state,
                country: action.payload.country,
                nokfirstname: action.payload.nokfirstname,
                noklastname: action.payload.noklastname,
                nokphone: action.payload.nokphone,
                nokaddress: action.payload.nokaddress,
                relationship: action.payload.relationship,
            }
            return {...state, onboard: action.payload}
        case Onboard.ActionTypes.OnboardSuccess:
            return {...state, user: action.payload}
        default:
            return state;
    }
}