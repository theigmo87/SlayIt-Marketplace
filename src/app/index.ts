// App
export * from './app.component';
export * from './app.service';

import { AppState } from './app.service';
import { ListingsService } from './services/listings.service';
import { Auth } from './services/auth.service';
// angular-jwt for auth0
import { AUTH_PROVIDERS } from 'angular2-jwt';
//firebase
import { FIREBASE_PROVIDERS, defaultFirebase } from 'angularfire2';


// Application wide providers
export const APP_PROVIDERS = [
  FIREBASE_PROVIDERS,
  defaultFirebase('https://angularattack-slayit.firebaseio.com'),
  AUTH_PROVIDERS,
  Auth,
  AppState,
  ListingsService
];
