using ClienteApi.Contracts;
using ClienteApi.Dtos;
using ClienteApi.Models;
using System.Drawing;

namespace ClienteApi.Services
{
    public class ClienteService : IClienteService
    {
        private readonly IClienteRepository _repo;

        public ClienteService(IClienteRepository repo) => _repo = repo;

        public async Task<IEnumerable<ClienteDTO>> ObtenerClientesPorLinqAsync(int page, int size)
        {
            IEnumerable<Cliente> data = await _repo.GetClientesViaLinqAsync(page, size);
            return data.Select(c => new ClienteDTO
            {
                Nombre = c.Nombre,
                Telefono = c.Telefono,
                Pais = c.Pais
            });
        }

        public async Task<IEnumerable<ClienteDTO>> ObtenerClientesPorSPAsync(int page, int size)
        {
            IEnumerable<Cliente> data = await _repo.GetClientesViaStoredProcAsync(page, size);
            return data.Select(c => new ClienteDTO
            {
                Nombre = c.Nombre,
                Telefono = c.Telefono,
                Pais = c.Pais
            });
        }

        public async Task<int> ObtenerCantidadClientesAsync()
        {
            return await _repo.GetCountClientes();
        }
    }
}
