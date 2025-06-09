import { Routes } from '@angular/router';
import { ClientesListComponent } from './components/clientes-list/clientes-list';

export const routes: Routes = [
    { path: '', redirectTo: 'clientes/sp', pathMatch: 'full' },
    { path: 'clientes/sp', component: ClientesListComponent, data: { tipo: 'sp' } },
    { path: 'clientes/linq', component: ClientesListComponent, data: { tipo: 'linq' } }
];