import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '../../services/auth.service';
import { FavoritesService } from '../../services/favorites.service';
import { CityResult } from '../../models/city.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: User | null = null;
  favorites: CityResult[] = [];

  constructor(private auth: AuthService, private favoritesService: FavoritesService) {}

  ngOnInit(): void {
    this.user = this.auth.currentUser;
    this.favoritesService.favorites$.subscribe(list => (this.favorites = list));
  }

  remove(city: CityResult): void {
    this.favoritesService.remove(city);
  }
}