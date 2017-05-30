import { Component, OnInit } from '@angular/core';

import { User } from '../../_models/index';
import {AuthenticationService} from "../../_services/authentication.service";

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    users: User[] = [];

    constructor(private authenticationService: AuthenticationService) {
    };

    ngOnInit() {
        this.loadAllUsers();
    }

    private loadAllUsers() {
        this.authenticationService.getUsers().subscribe(response => {
            this.users = response;
        });
    }
}