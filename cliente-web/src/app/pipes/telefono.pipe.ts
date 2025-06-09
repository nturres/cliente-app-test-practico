import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telefono',
  standalone: true
})
export class TelefonoPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    const clean = value.replace(/\D/g, '');
    if (clean.length !== 11 || !clean.startsWith('569')) 
      return value;
    const prefijo = clean.slice(0, 3);
    const parte1 = clean.slice(3, 7);
    const parte2 = clean.slice(7, 11);
    return `+${prefijo} ${parte1} ${parte2}`;
  }
}
