import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { NgForm } from '@angular/forms';


//interface y servicio
import { Junta_interface } from '../../data/interface/juntas'; //importamos la interface
import { JuntaServiceService } from '../../data/junta-service.service'; //importamos el servicio


@Component({
  selector: 'app-agregarjuntamodal',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './agregarjuntamodal.component.html',
  styleUrl: './agregarjuntamodal.component.css'
})
export class AgregarjuntamodalComponent {
  allJuntas: Junta_interface[] = []; //listado de juntas
  constructor(private http: HttpClient, private juntasService: JuntaServiceService) { }


  onJuntaCreate(juntas:{ nominal: string, nominal1: string, lineaOSistema: string, especificacion: string, schedule: string,
    tipo_extremos: string, tipo_material: string, material: string, diam_inch_contabilizadas: string,
    factor_pulgadas_diametrales: string, pulgadas_diametrales: string, proyectID: string, usuarioID: string}): void{
    this.juntasService.onJuntaCreate(juntas).subscribe(
      (response: Junta_interface) => {
        this.allJuntas.push(response);
      },
      (error: HttpErrorResponse) => {
        console.log('Error al crear la junta', error);
        // Muestro mensaje de error
      }
    );

  }


}
