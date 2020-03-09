import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportertestPage } from './reportertest.page';

describe('ReportertestPage', () => {
  let component: ReportertestPage;
  let fixture: ComponentFixture<ReportertestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportertestPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportertestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
