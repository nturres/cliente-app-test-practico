import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente, ClienteList } from '../../models/cliente.model';
import { ClientesService } from '../../services/clientes.service';
import { CommonModule } from '@angular/common';
import { TelefonoPipe } from '../../pipes/telefono.pipe';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-clientes-list',
  imports: [
    CommonModule,
    HttpClientModule,
    TelefonoPipe
  ],
  templateUrl: './clientes-list.html',
  styleUrl: './clientes-list.css'
})
export class ClientesListComponent implements OnInit {
  clientes: Cliente[] = [];
  total = 0;
  page = 1;
  pageSize = 10;
  tipo: 'sp' | 'linq' = 'sp';

  constructor(
    private clientesService: ClientesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.tipo = data['tipo'] || 'sp';
      this.page = 1;
      this.cargarClientes();
    });
  }

  cargarClientes(): void {
    const callback = (data: ClienteList) => {
      this.clientes = data.clientes;
      this.total = data.total;
    };

    if (this.tipo === 'sp') {
      this.clientesService.getClientesPorSP(this.page, this.pageSize)
        .subscribe(callback);
    } else {
      this.clientesService.getClientesPorLINQ(this.page, this.pageSize)
        .subscribe(callback);
    }
  }

  cambiarPagina(delta: number): void {
    this.page += delta;
    if (this.page < 1) this.page = 1;
    this.cargarClientes();
  }

  navegar(tipo: 'sp' | 'linq') {
    this.router.navigate([`/clientes/${tipo}`]);
  }
}