import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html'
})

export class RegisterComponent {
    model: any = {};
    loading = false;

    constructor() { }

    register() {
        this.loading = true;
        alert('Not implemented for POC !')
    }
}
