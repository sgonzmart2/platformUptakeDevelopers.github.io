import { TestBed } from '@angular/core/testing';

import { StatisticsDOAService } from './statistics-doa.service';

describe('StatisticsDOAService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StatisticsDOAService = TestBed.get(StatisticsDOAService);
    expect(service).toBeTruthy();
  });
});
