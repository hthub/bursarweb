import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NextofkinComponent } from './nextofkin.component';

describe('NextofkinComponent', () => {
  let component: NextofkinComponent;
  let fixture: ComponentFixture<NextofkinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NextofkinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NextofkinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
