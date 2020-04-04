import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigSceneComponent } from './config-scene.component';

describe('ConfigComponent', () => {
  let component: ConfigSceneComponent;
  let fixture: ComponentFixture<ConfigSceneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigSceneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigSceneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
