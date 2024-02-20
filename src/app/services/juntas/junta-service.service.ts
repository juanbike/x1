import { Injectable } from '@angular/core';
import {  HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {  map, catchError } from 'rxjs';
import {  Junta_interface } from '../../data/interface/juntas/juntas/juntas';
@Injectable({
  providedIn: 'root'
})
export class JuntaServiceService {
  private apiUrl="http://localhost:3500/api/juntas";
  allJuntas: Junta_interface[] = []; //listado de juntas

  constructor(private http:  HttpClient) { }

  fetchJuntas(): Observable<Junta_interface[]> {
    return this.http.get<Junta_interface[]>(this.apiUrl)
  }

  //Get by id
  getJunta(id: string): Observable<Junta_interface> {
    return this.http.get<Junta_interface>(`${this.apiUrl}/${id}`);
  }

   //Delete junta by id
   onDeleteJunta(id: string): Observable<Junta_interface> {
    return this.http.delete<Junta_interface>(`${this.apiUrl}/${id}`);
  }


  //Create Junta
  onJuntaCreate(  juntas:{ nominal: string, nominal1: string, lineaOSistema: string, especificacion: string, schedule: string,
    tipo_extremos: string, tipo_material: string, material: string, diam_inch_contabilizadas: string,
    factor_pulgadas_diametrales: string, pulgadas_diametrales: string, proyectID: string, usuarioID: string}): Observable<Junta_interface> { {
     return this.http.post<Junta_interface>(this.apiUrl, juntas);
    }
  }



}
