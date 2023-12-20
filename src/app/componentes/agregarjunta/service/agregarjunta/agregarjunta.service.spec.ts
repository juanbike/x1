import { TestBed } from '@angular/core/testing';

import { AgregarjuntaService } from './agregarjunta.service';

describe('AgregarjuntaService', () => {
  let service: AgregarjuntaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgregarjuntaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
