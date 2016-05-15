import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';
import { AppState } from '../app.service';
import { User } from '../models/user';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class FirebaseWrapper {
    constructor(public appState: AppState, public af: AngularFire) {
        
    }
}