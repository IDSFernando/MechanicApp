import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioPage } from './servicio.page';

describe('ServicioPage', () => {
  let component: ServicioPage;
  let fixture: ComponentFixture<ServicioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicioPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
