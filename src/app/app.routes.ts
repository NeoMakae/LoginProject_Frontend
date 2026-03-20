import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Registration } from './components/registration/registration';
import { User } from './components/user/user';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },  // optional home page
  { path: 'login', component: Login },
  { path: 'register', component: Registration },
  { path: 'user', component: User }                // protected by AuthGuard if you add one
];