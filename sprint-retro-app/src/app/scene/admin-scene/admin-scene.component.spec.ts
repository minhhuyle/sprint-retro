import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSceneComponent } from './admin-scene.component';

describe('AdminViewComponent', () => {
  let component: AdminSceneComponent;
  let fixture: ComponentFixture<AdminSceneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSceneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSceneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
