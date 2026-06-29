import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CityResult } from '../pages/search-cities/search-cities.component';

const STORAGE_KEY = 'travel_app_favorites';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favoritesSubject = new BehaviorSubject<CityResult[]>(this.restore());
  favorites$ = this.favoritesSubject.asObservable();

  private restore(): CityResult[] {
    const raw = localStorage.getItem(STORAGE_KEY);//where data saved 
    return raw ? JSON.parse(raw) : [];
  }

  private persist(list: CityResult[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
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