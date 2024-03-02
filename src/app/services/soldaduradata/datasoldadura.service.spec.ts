import { TestBed } from '@angular/core/testing';

import { DatasoldaduraService } from './datasoldadura.service';

describe('DatasoldaduraService', () => {
  let service: DatasoldaduraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatasoldaduraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
