import { Injectable } from '@angular/core';
import {  HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {  map, catchError } from 'rxjs';
import {  Junta_interface } from '../data/interface/juntas';
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

}
