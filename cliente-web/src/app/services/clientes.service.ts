import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClienteList } from '../models/cliente.model';
import { environment } from '../../environments/environment'; 
@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private apiUrl = `${environment.apiUrl}/clientes`;

  constructor(private http: HttpClient) {}

  getClientesPorSP(page: number, pageSize: number): Observable<ClienteList> {

    return this.http.get<ClienteList>(`${this.apiUrl}/sp?page=${page}&pageSize=${pageSize}`);
  }

  getClientesPorLINQ(page: number, pageSize: number): Observable<ClienteList> {
    return this.http.get<ClienteList>(`${this.apiUrl}/linq?page=${page}&pageSize=${pageSize}`);
  }
}
