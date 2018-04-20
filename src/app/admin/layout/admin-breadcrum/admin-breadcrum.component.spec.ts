import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBreadcrumComponent } from './admin-breadcrum.component';

describe('AdminBreadcrumComponent', () => {
  let component: AdminBreadcrumComponent;
  let fixture: ComponentFixture<AdminBreadcrumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBreadcrumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBreadcrumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
