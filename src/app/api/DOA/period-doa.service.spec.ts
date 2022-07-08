import { TestBed } from '@angular/core/testing';

import { PeriodDoaService } from './period-doa.service';

describe('PeriodDoaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PeriodDoaService = TestBed.get(PeriodDoaService);
    expect(service).toBeTruthy();
  });
});
