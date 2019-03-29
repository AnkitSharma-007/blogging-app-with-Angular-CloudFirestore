import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AppUser } from '../models/appuser';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {
  userData = new AppUser();
  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    return this.authService.appUser$.pipe(map(appUser => {
      if (appUser.isAdmin) { return true; }
      this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
      return false;
    }));
  }
}
