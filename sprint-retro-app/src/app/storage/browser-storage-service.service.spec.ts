import { TestBed } from '@angular/core/testing';

import { BrowserStorageServiceService } from './browser-storage-service.service';

describe('BrowserStorageServiceService', () => {
  let service: BrowserStorageServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrowserStorageServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
