import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IncidentesService, Incidente } from './incidentes.service';

// PLAN B: CAMBIO CRÍTICO AQUÍ
// Usamos la importación por defecto en lugar de "import * as ..."
// Esto permite modificar el accessToken sin errores de "read-only"
import mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // Usamos 'any' aquí temporalmente para evitar conflictos de tipos con la nueva importación
  map!: any;
  incidentes: Incidente[] = [];

  nuevoIncidente: Incidente = {
    tipo: '',
    descripcion: '',
    latitud: 0,
    longitud: 0
  };

  constructor(private incidentesService: IncidentesService) {}

  ngOnInit() {
    this.initMap();
    this.cargarIncidentes();
  }

  initMap() {
    // ASIGNACIÓN DEL TOKEN (Ya incluí el tuyo aquí)
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoiamtzNDU2Z2FtZXIiLCJhIjoiY21nd3BqdXJiMTFqNTJqcHR4amR0bm82NSJ9.5-1bR4G2FkDXCNlK8hte4g';

    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-99.1332, 19.4326],
      zoom: 12
    });

    this.map.addControl(new mapboxgl.NavigationControl());

    this.map.on('click', (e: any) => {
      this.nuevoIncidente.latitud = e.lngLat.lat;
      this.nuevoIncidente.longitud = e.lngLat.lng;
    });
  }

  cargarIncidentes() {
    this.incidentesService.getIncidentes().subscribe(data => {
      this.incidentes = data;
      this.incidentes.forEach(inc => {
        const popup = new mapboxgl.Popup({ offset: 25 })
          .setHTML(`<strong>${inc.tipo}</strong><br>${inc.descripcion}`);

        new mapboxgl.Marker({ color: 'red' })
          .setLngLat([inc.longitud, inc.latitud])
          .setPopup(popup)
          .addTo(this.map);
      });
    });
  }

  guardar() {
    if (!this.nuevoIncidente.tipo || this.nuevoIncidente.latitud === 0) {
      alert("Selecciona un punto en el mapa y elige el tipo.");
      return;
    }

    this.incidentesService.crearIncidente(this.nuevoIncidente).subscribe(() => {
      alert("¡Incidente registrado!");

      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(`<strong>${this.nuevoIncidente.tipo}</strong><br>${this.nuevoIncidente.descripcion}`);

      new mapboxgl.Marker({ color: 'blue' })
        .setLngLat([this.nuevoIncidente.longitud, this.nuevoIncidente.latitud])
        .setPopup(popup)
        .addTo(this.map);

      this.nuevoIncidente.descripcion = '';
      this.nuevoIncidente.tipo = '';
    });
  }
}
