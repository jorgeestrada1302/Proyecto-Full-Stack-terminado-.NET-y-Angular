using System.ComponentModel.DataAnnotations;

namespace IncidentesApi.Models
{
    public class Incidente
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Tipo { get; set; } = string.Empty; // Ej: Choque, Robo, Bache [cite: 6-9]

        [Required]
        public string Descripcion { get; set; } = string.Empty;

        // Latitud y Longitud para el mapa
        public double Latitud { get; set; } 
        public double Longitud { get; set; }

        public DateTime FechaRegistro { get; set; } = DateTime.Now;
    }
}