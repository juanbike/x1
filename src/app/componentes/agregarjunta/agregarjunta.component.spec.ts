import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarjuntaComponent } from './agregarjunta.component';

describe('AgregarjuntaComponent', () => {
  let component: AgregarjuntaComponent;
  let fixture: ComponentFixture<AgregarjuntaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarjuntaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarjuntaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
