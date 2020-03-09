import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalsPage } from './externals.page';

describe('ExternalsPage', () => {
  let component: ExternalsPage;
  let fixture: ComponentFixture<ExternalsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExternalsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
