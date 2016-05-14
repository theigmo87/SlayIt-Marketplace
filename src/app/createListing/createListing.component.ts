import { Component } from '@angular/core';
import { Listing } from './listing';
import { AppState } from '../app.service';

@Component({
  selector: 'createListing',
  styles: [],
  template: require('./createListing.html')
})
export class CreateListing {
  listing: Listing;
  
  constructor(public appState: AppState) {
    
  }

  ngOnInit() {
    this.listing = new Listing();
  }
  
  addListing(){
    let listings: Listing[] = this.appState.get("listings");
    this.listing.id = new Date().getTime();
    listings.push(this.listing);
    this.appState.set("listings", listings);
    this.listing = new Listing();
  }
  
}
