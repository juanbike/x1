import { TestBed } from '@angular/core/testing';

import { CrudSoldadoresService } from './crud-soldadores.service';

describe('CrudSoldadoresService', () => {
  let service: CrudSoldadoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudSoldadoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
