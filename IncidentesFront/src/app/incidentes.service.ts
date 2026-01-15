import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Incidente {
  id?: number;
  tipo: string;
  descripcion: string;
  latitud: number;
  longitud: number;
  fechaRegistro?: string;
}

@Injectable({
  providedIn: 'root'
})
export class IncidentesService {
  // Tu Backend está en el puerto 5027
  private apiUrl = 'http://3.238.149.168:5000/api/Incidentes';

  constructor(private http: HttpClient) { }

  getIncidentes(): Observable<Incidente[]> {
    return this.http.get<Incidente[]>(this.apiUrl);
  }

  crearIncidente(incidente: Incidente): Observable<Incidente> {
    return this.http.post<Incidente>(this.apiUrl, incidente);
  }
}
