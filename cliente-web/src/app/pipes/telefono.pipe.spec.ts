import { TelefonoPipe } from './telefono.pipe';

describe('TelefonoPipe', () => {
  const pipe = new TelefonoPipe();

  it('Debe formatear correctamente el número', () => {
    expect(pipe.transform('56912345678')).toBe('+569 1234 5678');
  });

  it('Debe devolver el valor original si el formato no es válido', () => {
    expect(pipe.transform('123')).toBe('123');
  });

  it('Debe retornar vacío si el valor es null o undefined', () => {
    expect(pipe.transform(null as any)).toBe('');
    expect(pipe.transform(undefined as any)).toBe('');
  });
});