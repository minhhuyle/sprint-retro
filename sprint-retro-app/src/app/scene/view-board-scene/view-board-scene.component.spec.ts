import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBoardSceneComponent } from './view-board-scene.component';

describe('ViewBoardComponent', () => {
  let component: ViewBoardSceneComponent;
  let fixture: ComponentFixture<ViewBoardSceneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewBoardSceneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBoardSceneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
