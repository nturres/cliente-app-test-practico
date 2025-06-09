using ClientesApi.Dtos;

namespace ClientesApi.Contracts
{
    public interface IClienteService
    {
        Task<IEnumerable<ClienteDTO>> ObtenerClientesPorLinqAsync(int page, int size);
        Task<IEnumerable<ClienteDTO>> ObtenerClientesPorSPAsync(int page, int size);
        Task<int> ObtenerCantidadClientesAsync();
    }
}
