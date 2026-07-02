import { Component, OnInit } from '@angular/core';
import { CityResult } from '../../models/city.model';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favorites: CityResult[] = [];

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit(): void {
    this.favoritesService.favorites$.subscribe(list => (this.favorites = list));
  }

  remove(city: CityResult): void {
    this.favoritesService.remove(city);
  }
}