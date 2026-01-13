using IncidentesApi.Models;
using Microsoft.EntityFrameworkCore;

namespace IncidentesApi.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        // Esta línea crea la tabla "Incidentes" en SQL Server
        public DbSet<Incidente> Incidentes { get; set; }
    }
}