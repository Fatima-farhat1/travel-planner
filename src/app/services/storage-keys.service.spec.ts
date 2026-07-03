import { TestBed } from '@angular/core/testing';

import { StorageKeysService } from './storage-keys.service';

describe('StorageKeysService', () => {
  let service: StorageKeysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageKeysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
