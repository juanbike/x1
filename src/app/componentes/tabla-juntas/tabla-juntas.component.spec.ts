import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaJuntasComponent } from './tabla-juntas.component';

describe('TablaJuntasComponent', () => {
  let component: TablaJuntasComponent;
  let fixture: ComponentFixture<TablaJuntasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaJuntasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TablaJuntasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
