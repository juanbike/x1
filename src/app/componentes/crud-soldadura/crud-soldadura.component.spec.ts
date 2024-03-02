import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudSoldaduraComponent } from './crud-soldadura.component';

describe('CrudSoldaduraComponent', () => {
  let component: CrudSoldaduraComponent;
  let fixture: ComponentFixture<CrudSoldaduraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudSoldaduraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrudSoldaduraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
