import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersManagerComponent } from './users-manager.component';

describe('UsersManagerComponent', () => {
  let component: UsersManagerComponent;
  let fixture: ComponentFixture<UsersManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
