import { Injectable } from '@angular/core';
import { HmrState } from 'angular2-hmr';
import { User } from './models/user';

@Injectable()
export class AppState {
  // @HmrState() is used by HMR to track the state of any object during a hot module replacement
  //@HmrState() _state = {};

  constructor() {

  }

  // already return a clone of the current state
  get state() {
    var state = localStorage.getItem("slayItAppState");
    if (!state) {
      var mockData = require('assets/mock-data/mock-listings.json');
      localStorage.setItem("slayItAppState", JSON.stringify(mockData));
    }
    return this._clone(JSON.parse(localStorage.getItem("slayItAppState")));
  }
  
  // never allow mutation
  set state(value) {
    throw new Error('do not mutate the `.state` directly');
  }

  get(prop?: any) {
    // use our state getter for the clone
    const state = JSON.parse(localStorage.getItem("slayItAppState"));
    return state[prop] || state;
  }

  set(prop: string, value: any) {
    // internally mutate our state
    var newState = this.state;
    newState[prop] = value;
    localStorage.setItem("slayItAppState", JSON.stringify(newState));
  }

  get user() : User {
    return this.get("user");
  }

  remove(prop: string) {
    var newState = this.state;
    if (newState[prop]) {
      delete newState[prop];
      localStorage.setItem("slayItAppState", JSON.stringify(newState));
    }
  }  

  _clone(object) {
    // simple object clone
    return JSON.parse(JSON.stringify( object ));
  }
}
