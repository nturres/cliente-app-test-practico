using ClienteApi.Models;
using Microsoft.EntityFrameworkCore;

namespace ClienteApi.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Cliente> Clientes { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Cliente>().HasData(
                new Cliente { Id = 1, Nombre = "Juan Pérez", Telefono = "56912345678", Pais = "Chile" },
                new Cliente { Id = 2, Nombre = "Ana Gómez", Telefono = "56987654321", Pais = "Argentina" }
            );
        }
    }
}
