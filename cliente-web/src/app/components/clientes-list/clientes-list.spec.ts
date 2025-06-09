import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientesListComponent } from './clientes-list';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientesService } from '../../services/clientes.service';
import { of } from 'rxjs';

describe('ClientesListComponent', () => {
  let component: ClientesListComponent;
  let fixture: ComponentFixture<ClientesListComponent>;

  let mockClientesService: any;
  let mockRouter: any;

  beforeEach(async () => {
    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };

    mockClientesService = {
      getClientesPorSP: jasmine.createSpy('getClientesPorSP').and.returnValue(of({ clientes: [], total: 0 })),
      getClientesPorLINQ: jasmine.createSpy('getClientesPorLINQ').and.returnValue(of({ clientes: [], total: 0 }))
    };
  });

  function createComponentWithTipo(tipo: 'sp' | 'linq') {
    TestBed.configureTestingModule({
      imports: [ClientesListComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { data: of({ tipo }) } },
        { provide: Router, useValue: mockRouter },
        { provide: ClientesService, useValue: mockClientesService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ClientesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  it('Debe ser creado correctamente si es de tipo "sp"', async () => {
    createComponentWithTipo('sp');
    expect(component).toBeTruthy();
  });

  it('Debe ser creado correctamente si es de tipo "linq"', async () => {
    createComponentWithTipo('linq');
    expect(component).toBeTruthy();
  });

  it('Debe cargar clientes con SP si tipo es "sp"', () => {
    createComponentWithTipo('sp');
    expect(mockClientesService.getClientesPorSP).toHaveBeenCalledWith(1, 10);
    expect(mockClientesService.getClientesPorLINQ).not.toHaveBeenCalled();
  });

  it('Debe cargar clientes con LINQ si tipo es "linq"', () => {
    createComponentWithTipo('linq');
    expect(mockClientesService.getClientesPorLINQ).toHaveBeenCalledWith(1, 10);
    expect(mockClientesService.getClientesPorSP).not.toHaveBeenCalled();
  });
});
