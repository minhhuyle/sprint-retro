import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteBoardSceneComponent } from './write-board-scene.component';

describe('WriteBoardComponent', () => {
  let component: WriteBoardSceneComponent;
  let fixture: ComponentFixture<WriteBoardSceneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WriteBoardSceneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WriteBoardSceneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
