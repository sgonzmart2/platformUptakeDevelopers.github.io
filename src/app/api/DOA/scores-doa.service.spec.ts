import { TestBed } from '@angular/core/testing';

import { ScoresDOAService } from './scores-doa.service';

describe('ScoresDOAService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScoresDOAService = TestBed.get(ScoresDOAService);
    expect(service).toBeTruthy();
  });
});
