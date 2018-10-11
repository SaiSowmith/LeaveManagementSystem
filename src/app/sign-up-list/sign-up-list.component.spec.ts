import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpListComponent } from './sign-up-list.component';

describe('SignUpListComponent', () => {
  let component: SignUpListComponent;
  let fixture: ComponentFixture<SignUpListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
