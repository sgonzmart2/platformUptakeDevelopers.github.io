import { TestBed } from '@angular/core/testing';

import { PlatformsDOAService } from './platforms-doa.service';

describe('PlatformsDOAService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlatformsDOAService = TestBed.get(PlatformsDOAService);
    expect(service).toBeTruthy();
  });
});
