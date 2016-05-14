import { Injectable } from '@angular/core';
import { HmrState } from 'angular2-hmr';

@Injectable()
export class AppState {
  // @HmrState() is used by HMR to track the state of any object during a hot module replacement
  @HmrState() _state = {};

  constructor() {
     
  }

  // already return a clone of the current state
  get state() {
    var state = localStorage.getItem("slayItAppState");
    if (!state){
      localStorage.setItem("slayItAppState", JSON.stringify({}));
    }
    return this._clone(JSON.parse(localStorage.getItem("slayItAppState")));
    //return this._state = this._clone(this._state);
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
    console.log(newState);
    newState[prop] = value;
    console.log(newState);
    return localStorage.setItem("slayItAppState", JSON.stringify(newState));
  }


  _clone(object) {
    // simple object clone
    return JSON.parse(JSON.stringify( object ));
  }
}
