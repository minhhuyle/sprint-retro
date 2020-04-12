import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemesManagerComponent } from './themes-manager.component';

describe('ThemesManagerComponent', () => {
  let component: ThemesManagerComponent;
  let fixture: ComponentFixture<ThemesManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemesManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemesManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
