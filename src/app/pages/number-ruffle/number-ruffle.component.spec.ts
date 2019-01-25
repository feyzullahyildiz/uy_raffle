import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberRuffleComponent } from './number-ruffle.component';

describe('NumberRuffleComponent', () => {
  let component: NumberRuffleComponent;
  let fixture: ComponentFixture<NumberRuffleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberRuffleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberRuffleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
