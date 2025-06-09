using ClienteApi.Contracts;
using Microsoft.AspNetCore.Mvc;

namespace ClienteApi.Controllers
{
    [ApiController]
    [Route("api/clientes")]
    public class ClientesController : ControllerBase
    {
        private readonly IClienteService _clienteService;

        public ClientesController(IClienteService clienteService)
        {
            _clienteService = clienteService;
        }

        [HttpGet("linq")]
        public async Task<IActionResult> GetClientesLinq([FromQuery] int page = 1, [FromQuery] int size = 10)
        {
            var clientes = await _clienteService.ObtenerClientesPorLinqAsync(page, size);
            return Ok(new { clientes, total = await _clienteService.ObtenerCantidadClientesAsync() });
        }

        [HttpGet("sp")]
        public async Task<IActionResult> GetClientesSp([FromQuery] int page = 1, [FromQuery] int size = 10)
        {
            var clientes = await _clienteService.ObtenerClientesPorSPAsync(page, size);
            return Ok(new { clientes, total = await _clienteService.ObtenerCantidadClientesAsync() });
        }
    }

}
