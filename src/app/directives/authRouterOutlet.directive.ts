import {Directive, Attribute, ViewContainerRef, DynamicComponentLoader} from 'angular2/core';
import {Router, RouterOutlet, ComponentInstruction} from 'angular2/router';
//import { Auth } from '../Services/auth.service'; // a service to handle auth

@Directive({
  selector: 'router-outlet'
})
export class AuthRouterOutlet extends RouterOutlet {
  privateRoutes: any;
  private parentRouter: Router;
    
  constructor(_viewContainerRef: ViewContainerRef, _loader: DynamicComponentLoader,
              _parentRouter: Router, @Attribute('name') nameAttr: string) {
      super(_viewContainerRef, _loader, _parentRouter, nameAttr);
      

    this.parentRouter = _parentRouter;
    this.privateRoutes = {
        '/': true,
        '/listings': true,
        '/createListing': true
    };
    // publicRoutes will be the routes auth is not needed for.
  }

  activate(instruction: ComponentInstruction) {
    var url = this.parentRouter.lastNavigationAttempt;
    if (this.privateRoutes[url]){ //&& this._userService.authenticated()) {
        // todo: redirect to Login, may be there a better way?
        // we return super.activate(instruction) here so the router can activate the requested route and it's components.
        return super.activate(instruction);  
    }
    return super.activate(instruction);  
    //this.parentRouter.navigateByUrl('/login');
  }
}