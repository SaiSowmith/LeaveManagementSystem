import { TestBed, inject } from '@angular/core/testing';

import { LeaveEditService } from './leave-edit.service';

describe('LeaveEditService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LeaveEditService]
    });
  });

  it('should be created', inject([LeaveEditService], (service: LeaveEditService) => {
    expect(service).toBeTruthy();
  }));
});
