import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresencaComponent } from './presenca.component';

describe('PresencaComponent', () => {
  let component: PresencaComponent;
  let fixture: ComponentFixture<PresencaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PresencaComponent]
    });
    fixture = TestBed.createComponent(PresencaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
