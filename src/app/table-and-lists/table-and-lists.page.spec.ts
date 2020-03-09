import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableAndListsPage } from './table-and-lists.page';

describe('TableAndListsPage', () => {
  let component: TableAndListsPage;
  let fixture: ComponentFixture<TableAndListsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableAndListsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableAndListsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
