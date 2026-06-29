// city-search.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

const UNSPLASH_KEY = 'YOUR_ACCESS_KEY';

@Injectable({ providedIn: 'root' })
export class CitySearchService {
  constructor(private http: HttpClient) {}

 }