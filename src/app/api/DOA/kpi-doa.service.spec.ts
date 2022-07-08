import { TestBed } from '@angular/core/testing';

import { KpiDoaService } from './kpi-doa.service';

describe('KpiDoaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KpiDoaService = TestBed.get(KpiDoaService);
    expect(service).toBeTruthy();
  });
});
