import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    if (this.auth.currentUser?.role === 'admin') {
      return true;
    }
    // Not an admin — bounce home rather than showing an empty/broken page
    return this.router.createUrlTree(['/']);
  }
}