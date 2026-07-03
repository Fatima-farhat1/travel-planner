import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { STORAGE_KEYS } from './storage-keys.service';

export type UserRole = 'admin' | 'user';

export interface User {
  name: string;
  email: string;
  role: UserRole;
}

interface StoredUser extends User {
  password: string;
}

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
    const raw = localStorage.getItem(STORAGE_KEYS.currentUser);
    if (!raw) {
      return null;
    }
    const user = JSON.parse(raw);
    // older sessions saved before roles existed won't have one — default to 'user'
    return { ...user, role: user.role || 'user' };
  }

  private getRegisteredUsers(): StoredUser[] {
    const raw = localStorage.getItem(STORAGE_KEYS.registeredUsers);
    return raw ? JSON.parse(raw) : [];
  }

  /**
   * Mock signup — in a real app this hits a backend.
   * The very first person to ever sign up becomes the admin account,
   * for demo purposes. Everyone after that is a regular user.
   */
  signup(name: string, email: string, password: string): Observable<User> {
    const users = this.getRegisteredUsers();
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error('An account with this email already exists.');
    }

    const role: UserRole = users.length === 0 ? 'admin' : 'user';
    const newUser: StoredUser = { name, email, password, role };
    users.push(newUser);
    localStorage.setItem(STORAGE_KEYS.registeredUsers, JSON.stringify(users));

    const user: User = { name, email, role };
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
    const user: User = { name: match.name, email: match.email, role: match.role || 'user' };
    return of(user).pipe(
      delay(500),
      tap(u => this.setSession(u))
    );
  }

  logout(): void {
    localStorage.removeItem(STORAGE_KEYS.currentUser);
    this.currentUserSubject.next(null);
  }

  private setSession(user: User): void {
    localStorage.setItem(STORAGE_KEYS.currentUser, JSON.stringify(user));
    this.currentUserSubject.next(user);
  }
}