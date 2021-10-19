import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrProjectsComponent } from './hr-projects.component';

describe('HrProjectsComponent', () => {
  let component: HrProjectsComponent;
  let fixture: ComponentFixture<HrProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrProjectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HrProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
