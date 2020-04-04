import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostItOnBoardComponent } from './post-it-on-board.component';

describe('PostItOnBoardComponent', () => {
  let component: PostItOnBoardComponent;
  let fixture: ComponentFixture<PostItOnBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostItOnBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostItOnBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
