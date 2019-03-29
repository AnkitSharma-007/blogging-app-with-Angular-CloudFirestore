import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollerComponent } from './scroller.component';

describe('ScrollerComponent', () => {
  let component: ScrollerComponent;
  let fixture: ComponentFixture<ScrollerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrollerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
