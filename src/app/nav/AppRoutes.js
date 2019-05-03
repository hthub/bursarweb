import { LoginComponent } from '../screens/login/login.component';
import { OnboardComponent } from '../screens/onboard/onboard.component';
import { SignupComponent } from './../screens/signup/signup.component';
import { DashboardComponent } from './../screens/dashboard/dashboard.component';

export const AppRoutes = [
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'onboard/:id', component: OnboardComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: '', redirectTo: 'login', pathMatch: 'full'}
];