import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturacionesComponent } from './facturaciones.component';

describe('FacturacionesComponent', () => {
  let component: FacturacionesComponent;
  let fixture: ComponentFixture<FacturacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacturacionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacturacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
