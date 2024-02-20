import { TestBed } from '@angular/core/testing';

import { JuntaServiceService } from './junta-service.service';

describe('JuntaServiceService', () => {
  let service: JuntaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JuntaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
