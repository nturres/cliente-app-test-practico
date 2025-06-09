import { TestBed } from '@angular/core/testing';
import { ClientesService } from './clientes.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ClienteList } from '../models/cliente.model';
import { environment } from '../../environments/environment';

describe('ClientesService', () => {

  let apiUrl = `${environment.apiUrl}/clientes`;

  let service: ClientesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClientesService]
    });

    service = TestBed.inject(ClientesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Debe ser creado correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('Debe obtener clientes usando el endpoint SP', () => {
    const mockResponse: ClienteList = {
      clientes: [
        { nombre: 'Juan', telefono: '56912345678', pais: 'Chile' },
        { nombre: 'Ana', telefono: '56987654321', pais: 'Chile' }
      ],
      total: 2
    };

    service.getClientesPorSP(1, 10).subscribe(data => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}/sp?page=1&pageSize=10`);
    expect(req.request.method).toBe('GET');

    // Simula respuesta del servidor
    req.flush(mockResponse);
  });

  it('Debe obtener clientes usando el endpoint LINQ', () => {
    const mockResponse: ClienteList = {
      clientes: [
        { nombre: 'Pedro', telefono: '56955555555', pais: 'Argentina' },
        { nombre: 'Lucía', telefono: '56944444444', pais: 'Argentina' }
      ],
      total: 2
    };
  
    service.getClientesPorLINQ(2, 5).subscribe(data => {
      expect(data).toEqual(mockResponse);
    });
  
    const req = httpMock.expectOne(`${apiUrl}/linq?page=2&pageSize=5`);
    expect(req.request.method).toBe('GET');
  
    req.flush(mockResponse);
  });
  
});
