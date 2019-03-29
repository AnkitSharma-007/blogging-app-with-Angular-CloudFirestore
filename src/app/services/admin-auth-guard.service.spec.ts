import { TestBed } from '@angular/core/testing';

import { AdminAuthGuardService } from './admin-auth-guard.service';

describe('AdminAuthGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminAuthGuardService = TestBed.get(AdminAuthGuardService);
    expect(service).toBeTruthy();
  });
});
