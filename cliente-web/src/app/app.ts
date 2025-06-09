import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClientesListComponent } from './components/clientes-list/clientes-list';
import { HttpClientModule } from '@angular/common/http';
import { TelefonoPipe } from './pipes/telefono.pipe';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HttpClientModule,
    ClientesListComponent,
    TelefonoPipe
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'cliente-web';
}
