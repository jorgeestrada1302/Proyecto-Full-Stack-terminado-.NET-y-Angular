
using IncidentesApi.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// 1. Configurar conexión a BD
// (Aquí arreglamos el error de la línea 8 que se te cortó)
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") 
                       ?? Environment.GetEnvironmentVariable("ConnectionStrings__DefaultConnection");

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// 2. CONFIGURAR CORS (Permitir todo)
builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirTodo", policy => 
    {
        policy.AllowAnyOrigin()    // Acepta cualquier IP
            .AllowAnyHeader()    // Acepta cualquier encabezado
            .AllowAnyMethod();   // Acepta GET, POST, PUT, DELETE
    });
});

var app = builder.Build();

// 3. USAR CORS (¡IMPORTANTE! Debe ir ANTES de MapControllers)
app.UseCors("PermitirTodo");

// if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();
// --- BLOQUE MÁGICO PARA CREAR BD AUTOMÁTICAMENTE ---
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<ApplicationDbContext>();
        context.Database.Migrate(); // Esto ejecuta los comandos "update database" solito
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "Ocurrió un error al crear la base de datos.");
    }
}
// ---------------------------------------------------

app.Run();
