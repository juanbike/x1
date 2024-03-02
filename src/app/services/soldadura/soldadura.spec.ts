import { TestBed } from '@angular/core/testing';

import { SoldaduraService } from './soldadura';

describe('SoldaduraService', () => {
  let service: SoldaduraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoldaduraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
