import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateTeamsComponent } from './generate-teams.component';

describe('GenerateTeamsComponent', () => {
  let component: GenerateTeamsComponent;
  let fixture: ComponentFixture<GenerateTeamsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenerateTeamsComponent]
    });
    fixture = TestBed.createComponent(GenerateTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
