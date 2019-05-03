import { AuthState } from './auth.reducer';

export const initialState: AuthState = {
    error: false,
    message: "",
    data: {},
    signup: {
        email: "",
        phone: null,
        password: "",
        username: "",
    },
    signin: {
        username: "",
        password: "",
    },
    onboard: {
        firstname: "",
        lastname: "",
        dob: "",
        gender: "",
        introduced_by: "",
        street: "",
        city: "",
        state: null,
        country: null,
        nokfirstname: "",
        noklastname: "",
        nokphone: null,
        nokaddress: "",
        relationship: null,
    },
    user: {},
}