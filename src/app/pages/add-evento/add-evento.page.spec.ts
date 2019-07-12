import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEventoPage } from './add-evento.page';

describe('AddEventoPage', () => {
  let component: AddEventoPage;
  let fixture: ComponentFixture<AddEventoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEventoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEventoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
