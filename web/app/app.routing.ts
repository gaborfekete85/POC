﻿import { Routes, RouterModule } from '@angular/router';
import { HomeComponent }        from './pages/home/index';
import { LoginComponent }       from './pages/login/index';
import { RegisterComponent }    from './pages/register/index';
import { AuthGuard }            from './_guards/index';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);