import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerarTimesComponent } from './gerar-times.component';

describe('GerarTimesComponent', () => {
  let component: GerarTimesComponent;
  let fixture: ComponentFixture<GerarTimesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GerarTimesComponent]
    });
    fixture = TestBed.createComponent(GerarTimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
