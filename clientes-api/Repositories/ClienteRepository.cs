using ClientesApi.Contracts;
using ClientesApi.Data;
using ClientesApi.Models;
using Microsoft.EntityFrameworkCore;

namespace ClientesApi.Repositories
{
    public class ClienteRepository : IClienteRepository
    {
        private readonly AppDbContext _context;

        public ClienteRepository(AppDbContext context) => _context = context;

        public async Task<IEnumerable<Cliente>> GetClientesViaLinqAsync(int page, int size)
        {
            return await _context.Clientes
                .Skip((page - 1) * size)
                .Take(size)
                .ToListAsync();
        }

        public async Task<IEnumerable<Cliente>> GetClientesViaStoredProcAsync(int page, int size)
        {
            return await _context.Clientes
                .FromSqlRaw("EXEC GetClientesPaginados @Page = {0}, @Size = {1}", page, size)
                .ToListAsync();
        }

        public async Task<int> GetCountClientes()
        {
            return await _context.Clientes.CountAsync();
        }
    }
}
