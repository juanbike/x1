import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalagregarjuntaComponent } from './modalagregarjunta.component';

describe('ModalagregarjuntaComponent', () => {
  let component: ModalagregarjuntaComponent;
  let fixture: ComponentFixture<ModalagregarjuntaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalagregarjuntaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalagregarjuntaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
