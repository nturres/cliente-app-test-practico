using ClienteApi.Dtos;

namespace ClienteApi.Contracts
{
    public interface IClienteService
    {
        Task<IEnumerable<ClienteDTO>> ObtenerClientesPorLinqAsync(int page, int size);
        Task<IEnumerable<ClienteDTO>> ObtenerClientesPorSPAsync(int page, int size);
        Task<int> ObtenerCantidadClientesAsync();
    }
}
