import { TestBed } from '@angular/core/testing';

import { BillUserService } from './bill-user.service';

describe('BillUserService', () => {
  let service: BillUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BillUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
