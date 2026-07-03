import { Injectable } from '@angular/core';
import { CityResult } from '../models/city.model';
import { UserRole } from './auth.service';
import { STORAGE_KEYS } from './storage-keys.service';

export interface AdminUserSummary {
  name: string;
  email: string;
  role: UserRole;
  favorites: CityResult[];
}

interface StoredUserRecord {
  name: string;
  email: string;
  role?: UserRole;
}

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  /** All registered users, each with their saved favorite cities attached. */
  getAllUsers(): AdminUserSummary[] {
    const raw = localStorage.getItem(STORAGE_KEYS.registeredUsers);
    const users: StoredUserRecord[] = raw ? JSON.parse(raw) : [];

    return users.map(u => ({
      name: u.name,
      email: u.email,
      role: u.role || 'user',
      favorites: this.getFavoritesFor(u.email)
    }));
  }

  getFavoritesFor(email: string): CityResult[] {
    const raw = localStorage.getItem(`${STORAGE_KEYS.favoritesPrefix}${email}`);
    return raw ? JSON.parse(raw) : [];
  }

  /** Lets an admin remove a favorite on a user's behalf. */
  removeFavoriteFor(email: string, city: CityResult): void {
    const list = this.getFavoritesFor(email).filter(c => c.name !== city.name);
    localStorage.setItem(`${STORAGE_KEYS.favoritesPrefix}${email}`, JSON.stringify(list));
  }

  /** Removes a user account entirely, along with their saved favorites. */
  removeUser(email: string): void {
    const raw = localStorage.getItem(STORAGE_KEYS.registeredUsers);
    const users: StoredUserRecord[] = raw ? JSON.parse(raw) : [];
    const updated = users.filter(u => u.email !== email);
    localStorage.setItem(STORAGE_KEYS.registeredUsers, JSON.stringify(updated));
    localStorage.removeItem(`${STORAGE_KEYS.favoritesPrefix}${email}`);
  }
}