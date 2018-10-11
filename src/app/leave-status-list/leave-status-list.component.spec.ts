import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveStatusListComponent } from './leave-status-list.component';

describe('LeaveStatusListComponent', () => {
  let component: LeaveStatusListComponent;
  let fixture: ComponentFixture<LeaveStatusListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveStatusListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveStatusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
