import { Component } from '@angular/core';
import { AppState } from '../app.service';

/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

@Component({
  selector: 'listings',
  styles: [],
  template: require('./listings.html')
})
export class Listings {
  listings = [];
  
  constructor(public appState: AppState) {
    
  }

  ngOnInit() {
    this.listings = this.appState.get("listings").listings;
  }
}
