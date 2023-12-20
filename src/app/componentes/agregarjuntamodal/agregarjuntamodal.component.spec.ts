import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarjuntamodalComponent } from './agregarjuntamodal.component';

describe('AgregarjuntamodalComponent', () => {
  let component: AgregarjuntamodalComponent;
  let fixture: ComponentFixture<AgregarjuntamodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarjuntamodalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarjuntamodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
