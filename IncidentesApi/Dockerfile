# Usamos la imagen oficial de .NET 8 para construir
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["IncidentesApi.csproj", "./"]
RUN dotnet restore "IncidentesApi.csproj"
COPY . .
RUN dotnet publish "IncidentesApi.csproj" -c Release -o /app/publish

# Usamos la imagen ligera para correr la app
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .
EXPOSE 8080
ENTRYPOINT ["dotnet", "IncidentesApi.dll"]
