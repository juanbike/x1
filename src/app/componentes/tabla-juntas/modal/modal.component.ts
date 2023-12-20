import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button'; //botones
import { MatIconModule } from '@angular/material/icon'; //iconos
import { MatFormFieldModule } from '@angular/material/form-field'; //
import { ReactiveFormsModule } from '@angular/forms'; //validaciones
import { TextFieldModule } from '@angular/cdk/text-field'; //textfield
import {MatInputModule} from '@angular/material/input'; //

//import {MatDialogModule} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    TextFieldModule,
    MatInputModule
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent implements OnInit {
  myForm!: FormGroup;
  firstNameAutofilled!: boolean;
  lastNameAutofilled!: boolean;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      nominal: ['', Validators.required],
      nominal1: ['', Validators.required],
      lineaOSistema: ['', Validators.required],
      especificacion: ['', Validators.required],
      schedule: ['', Validators.required],
      tipo_extremos: ['', Validators.required],
      tipo_material: ['', Validators.required],
      material: ['', Validators.required],
      diam_inch_contabilizadas: ['', Validators.required],
      factor_pulgadas_diametrales: ['', Validators.required],
      pulgadas_diametrales: ['', Validators.required],
      fecha: ['', Validators.required],
    });
  }

  onSubmit() {
    // Aquí puedes manejar la lógica de envío del formulario
    console.log(this.myForm.value);
  }

  @Input() juntaHijo!: {
    id: number;
    nominal: string;
    nominal1: string;
    lineaOSistema: string;
    especificacion: string;
    schedule: string;
    tipo_extremos: string;
    tipo_material: string;
    material: string;
    diam_inch_contabilizadas: string;
    factor_pulgadas_diametrales: string;
    pulgadas_diametrales: string;
    fecha: string;
    proyectID: string;
    usuarioID: string;
  }; // Datos de la junta hijo que vienen del componente padre

  @Output() miEvento: EventEmitter<boolean> = new EventEmitter<boolean>(); // propiedad 'output'  para enviar datos al componente padre

  notificarPadre(value: boolean) {
    // Evento para enviar datos al componente padre
    this.miEvento.emit(value);
  }
}
