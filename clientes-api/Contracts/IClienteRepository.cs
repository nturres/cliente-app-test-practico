using ClientesApi.Models;

namespace ClientesApi.Contracts
{
    public interface IClienteRepository
    {
        Task<IEnumerable<Cliente>> GetClientesViaLinqAsync(int page, int size);
        Task<IEnumerable<Cliente>> GetClientesViaStoredProcAsync(int page, int size);

        Task<int> GetCountClientes();
    }
}
