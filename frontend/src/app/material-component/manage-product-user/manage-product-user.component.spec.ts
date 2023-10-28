import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProductUserComponent } from './manage-product-user.component';

describe('ManageProductUserComponent', () => {
  let component: ManageProductUserComponent;
  let fixture: ComponentFixture<ManageProductUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageProductUserComponent]
    });
    fixture = TestBed.createComponent(ManageProductUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
