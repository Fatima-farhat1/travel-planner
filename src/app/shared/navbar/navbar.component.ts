import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, User } from '../../services/auth.service';
 
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  currentUser$: Observable<User | null> = this.auth.currentUser$;
 
  constructor(private auth: AuthService, private router: Router) {}
 
  onLogout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
 