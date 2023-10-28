import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBillUserComponent } from './view-bill-user.component';

describe('ViewBillUserComponent', () => {
  let component: ViewBillUserComponent;
  let fixture: ComponentFixture<ViewBillUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewBillUserComponent]
    });
    fixture = TestBed.createComponent(ViewBillUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
