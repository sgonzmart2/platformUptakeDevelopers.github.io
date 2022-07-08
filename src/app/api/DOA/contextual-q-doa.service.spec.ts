import { TestBed } from '@angular/core/testing';

import { ContextualQDOAService } from './contextual-q-doa.service';

describe('ContextualQDOAService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContextualQDOAService = TestBed.get(ContextualQDOAService);
    expect(service).toBeTruthy();
  });
});
