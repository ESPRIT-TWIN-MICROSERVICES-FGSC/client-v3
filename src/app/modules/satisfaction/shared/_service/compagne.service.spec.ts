import { TestBed } from '@angular/core/testing';

import { CompagneService } from './compagne.service';

describe('CompagneService', () => {
  let service: CompagneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompagneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
