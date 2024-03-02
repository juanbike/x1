import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { soldador_interface } from '../../data/interface/juntas/soldadores/soldadores';


@Injectable({
  providedIn: 'root',
})
export class CrudSoldadoresService {
  private apiUrl = 'http://localhost:3500/api/soldadores';

  allSoldadores: soldador_interface[] = []; //listado de soldadores

  constructor(private http: HttpClient) {}

  // Get all soldadores
  fetchSoldadores(): Observable<soldador_interface[]> {
    return this.http.get<soldador_interface[]>(this.apiUrl);
  }

  //Get by id
  getSoldador(id: string): Observable<soldador_interface> {
    return this.http.get<soldador_interface>(`${this.apiUrl}/${id}`);
  }

  //Delete Soldador by id
  onDeleteSoldador(id: string): Observable<soldador_interface> {
    return this.http.delete<soldador_interface>(`${this.apiUrl}/${id}`);
  }

  //Create Soldador
  onCreateSoldador(Soldador: {
    nombre: string;
    apellido: string;
    identificacion: string;
    valores: string;
    estampa: string;
    calificacion: string;
    basemetal: string;
    numerop: string;

  }): Observable<soldador_interface> {
    {
      return this.http.post<soldador_interface>(this.apiUrl, Soldador);
    }
  }
}
