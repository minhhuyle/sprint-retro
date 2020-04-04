import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSceneComponent } from './login-scene.component';

describe('LoginComponent', () => {
  let component: LoginSceneComponent;
  let fixture: ComponentFixture<LoginSceneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginSceneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginSceneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
