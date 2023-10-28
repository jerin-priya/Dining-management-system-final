import { TestBed } from '@angular/core/testing';

import { CategoryUserService } from './category-user.service';

describe('CategoryUserService', () => {
  let service: CategoryUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
