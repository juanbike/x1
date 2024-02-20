import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgregarSoldadorComponent } from './modal-agregar-soldador.component';

describe('ModalAgregarSoldadorComponent', () => {
  let component: ModalAgregarSoldadorComponent;
  let fixture: ComponentFixture<ModalAgregarSoldadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAgregarSoldadorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalAgregarSoldadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
