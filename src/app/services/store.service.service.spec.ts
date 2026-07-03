import { TestBed } from '@angular/core/testing';

import { Store.ServiceService } from './store.service.service';

describe('Store.ServiceService', () => {
  let service: Store.ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Store.ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
