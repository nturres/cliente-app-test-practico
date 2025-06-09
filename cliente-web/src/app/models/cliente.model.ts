export interface Cliente {
    nombre: string;
    telefono: string;
    pais: string;
}

export interface ClienteList {
    clientes: Cliente[]
    total: number;
}