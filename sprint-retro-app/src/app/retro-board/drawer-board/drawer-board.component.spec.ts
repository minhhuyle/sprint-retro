import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawerBoardComponent } from './drawer-board.component';

describe('DrawerBoardComponent', () => {
  let component: DrawerBoardComponent;
  let fixture: ComponentFixture<DrawerBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawerBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawerBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
