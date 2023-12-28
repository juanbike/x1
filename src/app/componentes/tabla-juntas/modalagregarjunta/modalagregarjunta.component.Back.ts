import { Component, EventEmitter, OnInit, Output } from '@angular/core';

//IMportaciones para el formulario
import { MatButtonModule } from '@angular/material/button'; //botones
import { MatIconModule } from '@angular/material/icon'; //iconos
import { MatFormFieldModule } from '@angular/material/form-field'; //
import { ReactiveFormsModule } from '@angular/forms'; //validaciones
import { TextFieldModule } from '@angular/cdk/text-field'; //textfield
import { MatInputModule } from '@angular/material/input'; //
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { CdkStepperModule } from '@angular/cdk/stepper'; //

import { CdkTableModule } from '@angular/cdk/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-modalagregarjunta',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    TextFieldModule,
    MatInputModule,
    MatCardModule,
    CdkStepperModule,
    CdkTableModule,
    MatDividerModule,
    MatToolbarModule,
    MatTableModule,
  ],
  templateUrl: './modalagregarjunta.component.html',
  styleUrl: './modalagregarjunta.component.css',
})
export class ModalagregarjuntaComponent implements OnInit {
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

  @Output() miEventoAlPadre: EventEmitter<boolean> =
    new EventEmitter<boolean>(); // propiedad 'output'  para enviar datos al componente padre

  notificarPadreJunta(value: boolean) {
    // Evento para enviar datos al componente padre
    this.miEventoAlPadre.emit(value);
  }
}
