﻿namespace ClienteApi.Models
{
    public class Cliente
    {
        public int Id { get; set; }
        public required string Nombre { get; set; }
        public required string Telefono { get; set; }
        public required string Pais { get; set; }
    }
}
