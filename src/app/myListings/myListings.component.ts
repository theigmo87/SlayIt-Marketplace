import { Component } from '@angular/core';
import { ListingsService } from '../services/listings.service';
import { Listing } from '../models/listing';
import { ROUTER_DIRECTIVES, CanActivate} from 'angular2/router';
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';
import { AppState } from '../app.service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

@Component({
  selector: 'myListings',
  styles: [],
  template: require('./myListings.html')
})

@CanActivate(() => tokenNotExpired())
  
export class MyListings {
  listings: FirebaseListObservable<any>;
  
  constructor(public listingsService: ListingsService, public appState: AppState, public af: AngularFire) {
    this.listings = listingsService.getMyListings();
  }

  ngOnInit() {
    
  }

  editListing(key: string) {
    console.log(key);
  }

  deleteListing(key: string) {
    this.listingsService.remove(key);
  }
}
