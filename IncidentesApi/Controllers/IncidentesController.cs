using IncidentesApi.Data;
using IncidentesApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace IncidentesApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IncidentesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public IncidentesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // 1. GET: api/Incidentes
        // Este endpoint obtiene todos los incidentes de la Base de Datos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Incidente>>> GetIncidentes()
        {
            return await _context.Incidentes.ToListAsync();
        }

        // 2. POST: api/Incidentes
        // Este endpoint recibe los datos del formulario y los guarda en SQL Server
        [HttpPost]
        public async Task<ActionResult<Incidente>> PostIncidente(Incidente incidente)
        {
            // Si no viene fecha, ponemos la fecha y hora actual
            if (incidente.FechaRegistro == default)
            {
                incidente.FechaRegistro = DateTime.Now;
            }

            _context.Incidentes.Add(incidente);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetIncidentes", new { id = incidente.Id }, incidente);
        }
    }
}