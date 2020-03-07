import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteBoardComponent } from './write-board.component';

describe('WriteBoardComponent', () => {
  let component: WriteBoardComponent;
  let fixture: ComponentFixture<WriteBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WriteBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WriteBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
