import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudSoldadoresComponent } from './crud-soldadores.component';

describe('CrudSoldadoresComponent', () => {
  let component: CrudSoldadoresComponent;
  let fixture: ComponentFixture<CrudSoldadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudSoldadoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrudSoldadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
