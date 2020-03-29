import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardsFormComponent } from './boards-form.component';

describe('BoardsFormComponent', () => {
  let component: BoardsFormComponent;
  let fixture: ComponentFixture<BoardsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
