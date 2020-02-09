import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostItHiddenComponent } from './post-it-hidden.component';

describe('PostItHiddenComponent', () => {
  let component: PostItHiddenComponent;
  let fixture: ComponentFixture<PostItHiddenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostItHiddenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostItHiddenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
