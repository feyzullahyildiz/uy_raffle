import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuffleButtonComponent } from './ruffle-button.component';

describe('RuffleButtonComponent', () => {
  let component: RuffleButtonComponent;
  let fixture: ComponentFixture<RuffleButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuffleButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuffleButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
