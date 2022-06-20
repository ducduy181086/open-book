import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenBookAdminComponent } from './open-book-admin.component';

describe('OpenBookAdminComponent', () => {
  let component: OpenBookAdminComponent;
  let fixture: ComponentFixture<OpenBookAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenBookAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenBookAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
