import { NgModule }              from '@angular/core';
import { BrowserModule }         from '@angular/platform-browser';
import { FormsModule }           from '@angular/forms';
import { HttpModule }            from '@angular/http';
import { AppComponent }          from './app.component';
import { routing }               from './app.routing';
import { AlertComponent }        from './_directives/index';
import { AuthGuard }             from './_guards/index';
import { AlertService,
         AuthenticationService } from './_services/index';
import { HomeComponent }         from './pages/home/index';
import { LoginComponent }        from './pages/login/index';
import { RegisterComponent }     from "./pages/register/register.component";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }