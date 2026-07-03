import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CityResult } from '../models/city.model';
import { AuthService, User } from './auth.service';
import { STORAGE_KEYS } from './storage-keys.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favoritesSubject = new BehaviorSubject<CityResult[]>([]);
  favorites$ = this.favoritesSubject.asObservable();

  /** localStorage key for whichever user is currently logged in (or the guest bucket) */
  private activeKey = STORAGE_KEYS.guestFavorites;

  constructor(private auth: AuthService) {
    this.loadForUser(this.auth.currentUser);
    // whenever someone logs in or out, switch to that person's own favorites list
    this.auth.currentUser$.subscribe(user => this.loadForUser(user));
  }

  private keyFor(user: User | null): string {
    return user ? `${STORAGE_KEYS.favoritesPrefix}${user.email}` : STORAGE_KEYS.guestFavorites;
  }

  private loadForUser(user: User | null): void {
    this.activeKey = this.keyFor(user);
    const raw = localStorage.getItem(this.activeKey);
    this.favoritesSubject.next(raw ? JSON.parse(raw) : []);
  }

  private persist(list: CityResult[]): void {
    localStorage.setItem(this.activeKey, JSON.stringify(list));
    this.favoritesSubject.next(list);
  }

  get current(): CityResult[] {
    return this.favoritesSubject.value;
  }

  add(city: CityResult): void {
    if (this.current.some(c => c.name === city.name)) {
      return; // already saved
    }
    this.persist([...this.current, city]);
  }

  remove(city: CityResult): void {
    this.persist(this.current.filter(c => c.name !== city.name));
  }
}