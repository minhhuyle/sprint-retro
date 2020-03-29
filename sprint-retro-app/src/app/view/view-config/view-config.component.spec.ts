import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewConfigComponent } from './view-config.component';

describe('ConfigComponent', () => {
  let component: ViewConfigComponent;
  let fixture: ComponentFixture<ViewConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
