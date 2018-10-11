import { TestBed, inject } from '@angular/core/testing';

import { Leave2Service } from './leave2.service';

describe('Leave2Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Leave2Service]
    });
  });

  it('should be created', inject([Leave2Service], (service: Leave2Service) => {
    expect(service).toBeTruthy();
  }));
});
