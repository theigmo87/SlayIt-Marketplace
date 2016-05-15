import { ROUTER_DIRECTIVES, CanActivate} from 'angular2/router';
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';
import { Component } from '@angular/core';
import { Router } from 'angular2/router';

import { AppState } from '../app.service';
import { Listing } from '../models/listing';
import { ListingsService } from '../services/listings.service';

@Component({
  selector: 'createListing',
  styles: [],
  template: require('./createListing.html')
})

@CanActivate(() => tokenNotExpired())
export class CreateListing {
  localListing: Listing;
  
  constructor(public listingsService: ListingsService, public router: Router, public appState: AppState) {
    this.localListing = new Listing();
  }

  ngOnInit() {

  }
  
  addListing(listing: Listing) {
    console.log(this.appState.user);
    listing.user_id = this.appState.user.user_id;
    console.log(listing);
    this.listingsService.add(listing);
    this.router.parent.navigate(['Listings']);
    this.localListing = new Listing();
  }
}
