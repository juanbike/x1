import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSoldaduraComponent } from './modal-soldadura.component';

describe('ModalSoldaduraComponent', () => {
  let component: ModalSoldaduraComponent;
  let fixture: ComponentFixture<ModalSoldaduraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalSoldaduraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalSoldaduraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
