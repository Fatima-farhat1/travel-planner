/*import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CitySearchService } from 'src/app/services/country.service';


@Component({
  selector: 'app-search-cities',
  templateUrl: './search-cities.component.html',
  styleUrls: ['./search-cities.component.scss']
})
export class SearchCitiesComponent implements OnInit {
  title = 'Search your destination!';
  city=new FormControl('',[Validators.required,Validators.minLength(3)]);
  countryInfo: any = null;
  images: any[] = [];

  constructor( private cityService: CitySearchService) { }

  ngOnInit(): void {
  }
 
}*/import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CityApiService } from '../../services/city.service';
import { FavoritesService } from '../../services/favorites.service';
import { CityResult } from '../../models/city.model';

export { CityResult } from '../../models/city.model'; // kept so older imports don't break

@Component({
  selector: 'app-search-cities',
  templateUrl: './search-cities.component.html',
  styleUrls: ['./search-cities.component.scss']
})
export class SearchCitiesComponent {
  title = 'Search your destination!';
  city = new FormControl('', [Validators.required, Validators.minLength(3)]);

  results: CityResult[] = [];
  loading = false;
  errorMessage: string | null = null;
  hasSearched = false;

  constructor(private cityApi: CityApiService, private favorites: FavoritesService) {}

  onSearch(): void {
    if (this.city.invalid) {
      this.city.markAsTouched();
      return;
    }

    const query = (this.city.value || '').trim();
    this.loading = true;
    this.errorMessage = null;
    this.hasSearched = true;

    this.cityApi.searchCities(query).subscribe({
      next: cities => {
        this.results = cities;
        this.loading = false;
      },
      error: (err: Error) => {
        this.results = [];
        this.errorMessage = err.message;
        this.loading = false;
      }
    });
  }

  saveFavorite(result: CityResult): void {
    this.favorites.add(result);
  }

  isSaved(result: CityResult): boolean {
    return this.favorites.current.some(c => c.name === result.name);
  }
}