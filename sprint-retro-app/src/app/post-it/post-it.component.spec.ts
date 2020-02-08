import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostItComponent } from './post-it.component';

describe('PostItComponent', () => {
  let component: PostItComponent;
  let fixture: ComponentFixture<PostItComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostItComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostItComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
