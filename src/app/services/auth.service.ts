import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

export interface User {
  name: string;
  email: string;
}

const STORAGE_KEY = 'travel_app_user';
const USERS_KEY = 'travel_app_users'; // mock "database" of registered users

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(this.restoreSession());
  /** Subscribe to this anywhere (e.g. navbar) to react to login/logout */
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  get isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  private restoreSession(): User | null {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  }

  private getRegisteredUsers(): Array<User & { password: string }> {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  /**
   * Mock signup — in a real app this hits a backend.
   * Swap the body of this method for an HttpClient call when the API is ready.
   */
  signup(name: string, email: string, password: string): Observable<User> {
    const users = this.getRegisteredUsers();
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error('An account with this email already exists.');
    }
    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    const user: User = { name, email };
    return of(user).pipe(
      delay(500), // simulate network latency for the demo
      tap(u => this.setSession(u))
    );
  }

  /**
   * Mock login — replace with a real HttpClient POST to your auth endpoint.
   */
  login(email: string, password: string): Observable<User> {
    const users = this.getRegisteredUsers();
    const match = users.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!match) {
      throw new Error('Incorrect email or password.');
    }
    const user: User = { name: match.name, email: match.email };
    return of(user).pipe(
      delay(500),
      tap(u => this.setSession(u))
    );
  }

  logout(): void {
    localStorage.removeItem(STORAGE_KEY);
    this.currentUserSubject.next(null);
  }

  private setSession(user: User): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    this.currentUserSubject.next(user);
  }
}