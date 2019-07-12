import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEventoPage } from './list-evento.page';

describe('ListEventoPage', () => {
  let component: ListEventoPage;
  let fixture: ComponentFixture<ListEventoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListEventoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEventoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
