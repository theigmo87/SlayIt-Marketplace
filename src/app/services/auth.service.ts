import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';
import { AppState } from '../app.service';
import { User } from '../models/user';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class Auth {
    lock = new Auth0Lock('YnuXALCw4xv9tj32uyVBPNJbtM60u4pb', 'theigmo87.auth0.com');
    refreshSubscription: any;
    user: User;
    zoneImpl: NgZone;
    logins: FirebaseListObservable<any[]>;

    constructor(private authHttp: AuthHttp, zone: NgZone, private router: Router, public appState: AppState, public af: AngularFire) {
        this.zoneImpl = zone;
    }

    public loggedIn(): boolean {
        // Check if there's an unexpired JWT
        return this.authenticated();
    }

    public authenticated(): boolean {
        return tokenNotExpired();
    }

    public login() {
        // Show the Auth0 Lock widget
        this.lock.show({}, (err, profile, token) => {
            if (err) {
                alert(err);
                return;
            }
            this.authenticationSuccessful(profile, token);
        });
    }

    public logout() {
        localStorage.removeItem('id_token');
        this.appState.remove('user');
        this.zoneImpl.run(() => this.user = null);
        this.router.navigate(['Home']);
    }

    private authenticationSuccessful(profile: any, token: string) {
        localStorage.setItem('id_token', token);
        var _user = new User(profile);
        var loginInfo = this.af.database.object("/logins/" + _user.user_id);
        loginInfo.subscribe(snapshot => snapshot == null ? this.register(_user) : this.loginSuccessful(_user));
    }

    private loginSuccessful(user: User) {
        this.appState.set('user', user);
        this.zoneImpl.run(() => this.user = user);
        this.router.navigate(['Listings']);
    }

    private register(_user: User) {
        var pushRef = this.af.database.object("/logins/" + _user.user_id);
        pushRef.set(_user.registrationData);
    }
}