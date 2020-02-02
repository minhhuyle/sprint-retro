import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointOfViewComponent } from './point-of-view.component';

describe('PointOfViewComponent', () => {
  let component: PointOfViewComponent;
  let fixture: ComponentFixture<PointOfViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointOfViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointOfViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
