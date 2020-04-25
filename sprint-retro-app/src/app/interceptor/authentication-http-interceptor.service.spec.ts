import { TestBed } from '@angular/core/testing';

import { AuthenticationHttpInterceptorService } from './authentication-http-interceptor.service';

describe('AuthenticationHttpInterceptorService', () => {
  let service: AuthenticationHttpInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticationHttpInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
