import { TestBed } from '@angular/core/testing';

import { UserDOAService } from './user-doa.service';

describe('UserDOAService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserDOAService = TestBed.get(UserDOAService);
    expect(service).toBeTruthy();
  });
});
