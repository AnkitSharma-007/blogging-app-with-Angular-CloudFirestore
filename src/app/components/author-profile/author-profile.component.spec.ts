import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorProfileComponent } from './author-profile.component';

describe('AuthorProfileComponent', () => {
  let component: AuthorProfileComponent;
  let fixture: ComponentFixture<AuthorProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
