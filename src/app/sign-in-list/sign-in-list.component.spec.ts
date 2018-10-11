import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInListComponent } from './sign-in-list.component';

describe('SignInListComponent', () => {
  let component: SignInListComponent;
  let fixture: ComponentFixture<SignInListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignInListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
