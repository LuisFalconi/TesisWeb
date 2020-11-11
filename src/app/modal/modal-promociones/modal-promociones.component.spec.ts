import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPromocionesComponent } from './modal-promociones.component';

describe('ModalPromocionesComponent', () => {
  let component: ModalPromocionesComponent;
  let fixture: ComponentFixture<ModalPromocionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPromocionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPromocionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
