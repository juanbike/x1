import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Soldadura } from '../../data/soldadura/soldadura.interface.qrcode';


@Injectable({
  providedIn: 'root'
})
export class SoldaduraService {
  private apiUrl = 'http://localhost:3500/api/soldadura';
  allSoldadura: Soldadura[] = []; //listado de soldaduras
  constructor(private http: HttpClient) {}

  // Get all soldadores
  fetchSoldadura(): Observable<Soldadura[]> {
    return this.http.get<Soldadura[]>(this.apiUrl);
  }

  //Get by id
  getSoldadura(id: string): Observable<Soldadura> {
    return this.http.get<Soldadura>(`${this.apiUrl}/${id}`);
  }

  //Delete Soldador by id
  onDeleteSoldadura(id: string): Observable<Soldadura> {
    return this.http.delete<Soldadura>(`${this.apiUrl}/${id}`);
  }


  onCreateSoldadura(Soldadura: {
    nro_junta: string;
    tipo: string;
    plano: string;
    hoja: string;
    revision: string;
    area: string;
    fase: string;
    linea: string;
    diametro: string;
    espesor: string;
    cedula: string;
    pn1: string;
    pn2: string;
    wps: string;


  }): Observable<Soldadura> {
    {
      return this.http.post<Soldadura>(this.apiUrl, Soldadura);
    }
  }


}
