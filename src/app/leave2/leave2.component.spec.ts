import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Leave2Component } from './leave2.component';

describe('Leave2Component', () => {
  let component: Leave2Component;
  let fixture: ComponentFixture<Leave2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Leave2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Leave2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
