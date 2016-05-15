import { Injectable } from '@angular/core';
import { Listing } from '../models/listing';
import { AppState} from '../app.service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';


@Injectable()
export class ListingsService {
    _listings: FirebaseListObservable<any[]>;

    constructor(public appState: AppState, public af: AngularFire) {
        this._listings = af.database.list("/listings", {
            query: {
                orderByChild: "user_id",
                equalTo: appState.user.user_id,
                orderByKey: true
            }
        });
    }

    getAll(): FirebaseListObservable<any[]> {
        return this.af.database.list("/listings");
    }

    getMyListings(): FirebaseListObservable<any[]>{
        return this.af.database.list("/listings", {
            query: {
                orderByChild: "user_id",
                equalTo: this.appState.user.user_id
            }
        });
    }

    set(value: any) {
        throw new Error('do not mutate the listings directly');
    }    

    get(key: string): FirebaseListObservable<any> {
        return this.af.database.list("/listings/" + key);
    }

    add(listing: Listing) {
        this.getAll().push(listing);
    }    

    addUpdate(listing: Listing) {
        // var index = this._listings.findIndex((item) => item.id == listing.id);
        // if (index < 0)
        //     this._listings.push(listing);
        // else
        //     this._listings[index] = listing;
    }

    remove(key: string) {
        this.getAll().remove(key);
    }

    _clone(object) {
        // simple object clone
        return JSON.parse(JSON.stringify( object ));
    }
}
