import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonplacerholderComponent } from './jsonplacerholder.component';

describe('JsonplacerholderComponent', () => {
  let component: JsonplacerholderComponent;
  let fixture: ComponentFixture<JsonplacerholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JsonplacerholderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JsonplacerholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
