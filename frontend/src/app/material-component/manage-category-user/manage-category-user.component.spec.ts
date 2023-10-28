import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCategoryUserComponent } from './manage-category-user.component';

describe('ManageCategoryUserComponent', () => {
  let component: ManageCategoryUserComponent;
  let fixture: ComponentFixture<ManageCategoryUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageCategoryUserComponent]
    });
    fixture = TestBed.createComponent(ManageCategoryUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
