import { Injectable } from '@angular/core';
import { HmrState } from 'angular2-hmr';
import { User } from './models/user';

@Injectable()
export class AppState {
  // @HmrState() is used by HMR to track the state of any object during a hot module replacement
  @HmrState() _state = { };

  constructor() {

  }

  // already return a clone of the current state
  get state() {
    return this._state = this._clone(this._state);
  }
  // never allow mutation
  set state(value) {
    throw new Error('do not mutate the `.state` directly');
  }

  get(prop?: any) {
    // use our state getter for the clone
    const state = this.state;
    return state[prop] || state;
  }

  set(prop: string, value: any) {
    // internally mutate our state
    return this._state[prop] = value;
  }

  get user() : User {
    return this.get("user");
  }

  remove(prop: string) {
    if (this._state[prop])
      this._state[prop];
  }  

  _clone(object) {
    // simple object clone
    return JSON.parse(JSON.stringify( object ));
  }
}
