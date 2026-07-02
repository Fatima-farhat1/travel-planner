import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CityApiService } from './city-api.service';

describe('CityApiService', () => {
  let service: CityApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CityApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});