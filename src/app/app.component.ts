/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { RouteConfig, Router } from '@angular/router-deprecated';
import { Auth } from './services/auth.service';

import { AppState } from './app.service';
import { Home } from './home';
import { RouterActive } from './router-active';
import { AuthRouterOutlet } from './directives/authRouterOutlet.directive';
import { CreateListing } from './createListing';
import { Listings } from './listings';
import { MyListings } from './myListings';
import { Login } from './login';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  pipes: [ ],
  providers: [ Auth ],
  directives: [ RouterActive ],
  encapsulation: ViewEncapsulation.None,
  styles: [
    require('normalize.css'),
    `html, body{
      height: 100%;
      background: #F4FAFA;
    }
    button.active{
      background: #fff;
      color: #009688;
    }
    button.active:hover{
      color: #fff;
    }
    .fill{
      flex: 1 1 auto;
    }
    .app-state{
      margin: 15px;
      flex: 1;
    }
    .home{
      flex: 1;
    }
    md-content{
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    div.contentContainer{
      width:980px;
      margin:48px auto;
    }
    footer{
      flex: 0 0 60px;
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }`
    
  ],
  template: `
    <md-content>
      <md-toolbar color="primary">
          <span>{{ name }}</span>
          <span class="fill"></span>
          <button md-button router-active [routerLink]=" ['Listings'] " *ngIf="auth.authenticated()">
            Listings
          </button>
          <button md-button router-active [routerLink]=" ['MyListings'] " *ngIf="auth.authenticated()">
            My Listings
          </button>
          <button md-button router-active [routerLink]=" ['CreateListing'] " *ngIf="auth.authenticated()">
            Create Listing
          </button>
          <button md-button (click)="auth.logout()" *ngIf="auth.authenticated()">
            Log Out
          </button>
          <span *ngIf="auth.authenticated()" style="font-size:14px; margin-left:8px;">
            {{ appState.user.name }}
          </span>
          <span *ngIf="auth.authenticated() && appState.user.picture" >
            <img [src]="appState.user.picture" style="height:48px; width:auto; border-radius:50%; margin-left:16px;" />
          </span>
      </md-toolbar>
      <div class="contentContainer">
        <!-- Routed views go here -->
        <router-outlet></router-outlet>
      </div>
      

      <md-progress-bar mode="indeterminate" color="primary" *ngIf="loading"></md-progress-bar>

      <footer>
        <p>
          Made by me, Jimmy G!
        </p>
      </footer>
      </md-content>
  `
})
@RouteConfig([
    { path: '/', name: 'Home', component: Login },
    { path: '/login', name: "Login", component: Login },
    { path: '/listings', name: 'Listings', component: Listings, useAsDefault: true },
    { path: '/myListings', name:'MyListings', component: MyListings },
    { path: '/createListing', name: 'CreateListing', component: CreateListing }
])
export class App {
  angularclassLogo = 'assets/img/angularclass-avatar.png';
  loading = false;
  name = 'SlayIt MarketPlace';
  url = 'https://twitter.com/AngularClass';

  constructor(
    public appState: AppState,
    private auth: Auth) {
    auth.logout();
  }

  ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }
}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
