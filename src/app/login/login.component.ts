import { Component } from '@angular/core';
import { Auth } from '../services/auth.service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Router } from 'angular2/router';
import { AppState } from '../app.service';

@Component({
  selector: 'listings',
  styles: [],
  template: require('./login.html')
})
export class Login {
  items: FirebaseListObservable<any>;
  constructor(public auth: Auth, public af: AngularFire, public router: Router, appState: AppState) {
    
  }

  loggedIn() {
    return this.auth.loggedIn();
  }

  login() {
    this.auth.login();
  }

  logout() {
    this.auth.logout();
  }

  ngOnInit() {
    
  }
}
