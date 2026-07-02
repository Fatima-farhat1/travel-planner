import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { CityResult, CityDetail } from '../models/city.model';

// GeoDB Cities (RapidAPI) — free tier docs: https://rapidapi.com/wirefreethought/api/geodb-cities
const BASE_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities';

interface GeoDbCity {
  id: number;
  name: string;
  country: string;
  region: string;
  population: number;
  latitude: number;
  longitude: number;
  timezone?: string;
  elevationMeters?: number | null;
}

interface GeoDbResponse<T> {
  data: T[];
}

interface GeoDbSingleResponse<T> {
  data: T;
}

@Injectable({
  providedIn: 'root'
})
export class CityApiService {
  private headers = new HttpHeaders({
    'X-RapidAPI-Key': environment.geoDbApiKey,
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
  });

  constructor(private http: HttpClient) {}

  /** Search cities by name prefix, e.g. "Lis" -> Lisbon, Lisburn, ... */
  searchCities(query: string): Observable<CityResult[]> {
    const url = `${BASE_URL}?namePrefix=${encodeURIComponent(query)}&limit=10&sort=-population`;

    return this.http.get<GeoDbResponse<GeoDbCity>>(url, { headers: this.headers }).pipe(
      map(res => res.data.map(city => this.toCityResult(city))),
      catchError(this.handleError)
    );
  }

  /** Fetch a single city's full details by its GeoDB id, for the city-details page. */
  getCityDetails(id: string): Observable<CityDetail> {
    const url = `${BASE_URL}/${id}`;

    return this.http.get<GeoDbSingleResponse<GeoDbCity>>(url, { headers: this.headers }).pipe(
      map(res => ({
        ...this.toCityResult(res.data),
        timezone: res.data.timezone,
        elevationMeters: res.data.elevationMeters
      })),
      catchError(this.handleError)
    );
  }

  private toCityResult(city: GeoDbCity): CityResult {
    return {
      id: String(city.id),
      name: city.name,
      country: city.country,
      region: city.region,
      population: city.population,
      latitude: city.latitude,
      longitude: city.longitude,
      // Deterministic placeholder photo per city — no image API key needed.
      image: `https://picsum.photos/seed/${encodeURIComponent(city.name)}/600/400`,
      description: `${city.region}, ${city.country} • ${city.population.toLocaleString()} people`
    };
  }

  private handleError(error: any): Observable<never> {
    const message =
      error?.status === 429
        ? 'Too many requests right now — the free API tier is rate-limited. Try again in a minute.'
        : error?.status === 401 || error?.status === 403
        ? 'City search isn\u2019t configured yet — missing or invalid API key.'
        : 'Couldn\u2019t reach the city search service. Check your connection and try again.';

    return throwError(() => new Error(message));
  }
}