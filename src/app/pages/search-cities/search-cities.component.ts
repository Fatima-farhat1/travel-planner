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
 
}*/
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FavoritesService } from '../../services/favorites.service';

export interface CityResult {
  name: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-search-cities',
  templateUrl: './search-cities.component.html',
  styleUrls: ['./search-cities.component.scss']
})
export class SearchCitiesComponent implements OnInit {
  title = 'Search your destination!';
  city = new FormControl('', [Validators.required, Validators.minLength(3)]);
  results: CityResult[] = [];

  constructor(private favorites: FavoritesService) {}

  ngOnInit(): void {}

  saveFavorite(result: CityResult): void {
    this.favorites.add(result);
  }

  isSaved(result: CityResult): boolean {
    return this.favorites.current.some(c => c.name === result.name);
  }

  /**
   * Demo search — replace with a real call to your CitySearchService /
   * HttpClient once the backend is wired up. Keeping it local keeps this
   * page runnable on its own for the demo.
   */
  onSearch(): void {
    if (this.city.invalid) {
      this.city.markAsTouched();
      return;
    }

    const query = (this.city.value || '').trim();
    this.results = [
      {
        name: query,
        description: `A quick look at ${query}: walkable center, good food scene, easy day trips nearby.`,
        image: '/assets/images/img1.jpg'
      },
      {
        name: `${query} Old Town`,
        description: 'Historic district packed with cafés, markets, and architecture worth the detour.',
        image: '/assets/images/img2.jpg'
      },
      {
        name: `Around ${query}`,
        description: 'Day-trip spots within an hour — coastline, hills, or countryside depending on the season.',
        image: '/assets/images/img3.jpg'
      }
    ];
  }
}