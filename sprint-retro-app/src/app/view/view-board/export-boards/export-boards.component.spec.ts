import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportBoardsComponent } from './export-boards.component';

describe('ExportBoardsComponent', () => {
  let component: ExportBoardsComponent;
  let fixture: ComponentFixture<ExportBoardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportBoardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportBoardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
