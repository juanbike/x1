import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
  FormControl,
  AbstractControl
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button'; //botones
import { MatIconModule } from '@angular/material/icon'; //iconos
import { TextFieldModule } from '@angular/cdk/text-field'; //textfield
import { CdkStepperModule } from '@angular/cdk/stepper'; //

import { CdkTableModule } from '@angular/cdk/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

import {
  HttpClient,
  HttpClientModule,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

//interface y servicio

import { JuntaServiceService } from '../../../services/juntas/junta-service.service';
import { Junta_interface } from '../../../data/interface/juntas/juntas/juntas';

@Component({
  selector: 'app-modalagregarjunta',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatRadioModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    TextFieldModule,
    CdkStepperModule,
    CdkTableModule,
    MatDividerModule,
    MatToolbarModule,
    MatTableModule,
  ],
  templateUrl: './modalagregarjunta.component.html',
  styleUrl: './modalagregarjunta.component.css',
})
export class ModalagregarjuntaComponent {
  allJuntas: Junta_interface[] = []; //listado de juntas

  constructor(
    private http: HttpClient,
    private juntasService: JuntaServiceService,
    private builder: FormBuilder,
    private snackBar: MatSnackBar //inicializamos el snackbar para mostrar notificaciones al usuario
  ) {}

  formGroup!: FormGroup; // Defnimos el nombre del Formulario

  @Output() miEventoAlPadre: EventEmitter<boolean> =
    new EventEmitter<boolean>(); // propiedad 'output'  para enviar datos al componente padre

  notificarPadreJunta(value: boolean) {
    // Evento para enviar datos al componente padre
    this.miEventoAlPadre.emit(value);
  }



  /*
********************************************************************
Muestra una notificación al usuario.
********************************************************************
*/

openSnackBar(message: string, action: string) {
  const config = new MatSnackBarConfig();
  config.panelClass = ['blue-snackbar'];
  config.horizontalPosition = 'end'; // Posición horizontal: 'start' | 'center' | 'end' | 'left' | 'right'
  config.verticalPosition = 'top'; // Posición vertical: 'top' | 'bottom'
  config.duration = 3000; // Duración en milisegundos (opcional)
  this.snackBar.open(message, action, config);
}


  /*
********************************************************************
Cargamos los select del formulario con los datos de los arrays
********************************************************************
*/



  countrylist = ['India', 'USA', 'Singapore', 'UK'];
  termlist = ['15days', '30days', '45days', '60days'];
  nominal1list = [
    '1/2"',
    '1"',
    '1 1/2',
    '2"',
    '2 1/2',
    '3"',
    '3/4"',
    '4"',
    '6"',
    '8"',
    '10"',
    '12"',
    '14"',
    '16"',
    '18"',
    '20"',
    '22"',
    '24"',
    '26"',
    '28"',
    '30"',
    '32"',
    '34"',
    '36"',
  ]; //Arraay  de diametros para el select del formomulario modal agregar junta

  nominal2list = [
    '0,5',
    '0,75',
    '1',
    '1,5',
    '1,25',
    '2',
    '2,5',
    '3',
    '4',
    '6',
    '8',
    '10',
    '12',
    '14',
    '16',
    '18',
    '20',
    '22',
    '24',
    '26',
    '28',
    '30',
    '32',
    '34',
    '36',
  ]; // Arraay  de diametros para el select del formomulario modal agregar junta

  sistemalist = [
    '601-CCPSL-PIP-E3D-Rack-Fuel gas supplied system',
    '601-CCPSL-PIP-E3D-Rack-Fuel gas supplied system',
    '601-CCPSL-PIP-E3D-Rack-Ignition Fuel Gas Supply system',
    '601-CCPSL-PIP-E3D-Rack-Phase 2-Fuel gas supplied system',
    '601-CCPSL-PIP-E3D-Zone C-Fuel gas supplied system',
    '601-CCPSL-PIP-E3D-Zone C-Phase 2-Fuel gas supplied system',
    '602-CCPSL-PIP-E3D-Rack-Liquid fuel storage and supply system',
    '602-CCPSL-PIP-E3D-Zone A-Liquid fuel storage and supply system',
    '602-CCPSL-PIP-E3D-Zone C-Ignition Fuel Gas Supply System',
    '602-CCPSL-PIP-E3D-Zone C-instrument Ignition Fuel Gas',
    '602-CCPSL-PIP-E3D-Zone C-Liquid fuel storage and supply system',
    '603-CCPSL-PIP-E3D-Rack-Phase 2-Raw Water Intake & Pretreatment System',
    '603-CCPSL-PIP-E3D-Rack-Raw Water Intake & Pretreatment System',
    '603-CCPSL-PIP-E3D-Zone B-Chemical Dosing',
    '603-CCPSL-PIP-E3D-Zone B-Phase 2-Raw Water Intake & Pretreatment System',
    '603-CCPSL-PIP-E3D-Zone B-Raw Water Intake & Pretreatment System',
    '604-CCPSL-PIP-E3D-Rack-Phase 2-Service Water System',
    '604-CCPSL-PIP-E3D-Rack-Service Water System',
    '604-CCPSL-PIP-E3D-Zone A-Service Water System',
    '604-CCPSL-PIP-E3D-Zone B-Service Water System',
    '604-CCPSL-PIP-E3D-Zone C-Phase 2-Service Water System',
    '604-CCPSL-PIP-E3D-Zone C-Service Water System',
    '605-CCPSL-PIP-E3D-Rack-Demin Water Storage and Distribution System',
    "605-CCPSL-PIP-E3D-Rack-Phase 2-Demin Water Storage and Distribution System",
    '605-CCPSL-PIP-E3D-Zone B-Demin Water Storage and Distribution System',
    "605-CCPSL-PIP-E3D-Zone B-Phase 2-Demin Water Storage and Distribution System",
    '605-CCPSL-PIP-E3D-Zone C-Demi Water Storage and Distribution System',
    "605-CCPSL-PIP-E3D-Zone-C-Phase-2-Demi-Water-Storage-and-Distribution-System",
    '606-CCPSL-PIP-E3D-Rack-HP Drain Steam System',
    '606-CCPSL-PIP-E3D-Zone C-Phase 2-HP Steam System',
    '606-CCPSL-PIP-E3D-Zone C-Phase 2-LP13 Steam System',
    '606-CCPSL-PIP-E3D-Zone C-Phase 2-LP7 Steam System',
    '606-CCPSL-PIP-E3D-Zone C-Phase 2-TV-HP Drain Steam System',
    '607-CCPSL-PIP-E3D-Zone B-Phase 2-Cooling Water System',
    '607-CCPSL-PIP-E3D-Zone C-Phase 2-Cooling Water System',
    '607-CCPSL-PIP-E3D-Zone C-Phase 2-Cooling water Tower',
    '608-CCPSL-PIP-E3D-Zone C-Phase 2 - Condensate vent system',
    '608-CCPSL-PIP-E3D-Zone C-Phase 2-Condensate System',
    '609-CCPSL-PIP-E3D-Zone C-Close Cooling Water System',
    '609-CCPSL-PIP-E3D-Zone C-Close Cooling Water System Manifold',
    '610-CCPSL-PIP-E3D-Rack- Neutralization Drain System',
    '610-CCPSL-PIP-E3D-Zone A-Drainage System',
    '610-CCPSL-PIP-E3D-Zone B- Neutralization Drain System',
    '610-CCPSL-PIP-E3D-Zone B-Neutralization PIT Blower Air system',
    '610-CCPSL-PIP-E3D-Zone C-Drainage system',
    '612-CCPSL-PIP-E3D-Zone C-Phase 2-Auxiliar steam system',
    '616-CCPSL-PIP-E3D-Rack-Compressed Air System',
    '616-CCPSL-PIP-E3D-Rack-Phase 2-Compressed Air System',
    '616-CCPSL-PIP-E3D-Zone A-Compressed Air System',
    '616-CCPSL-PIP-E3D-Zone B-Compressed Air System',
    '616-CCPSL-PIP-E3D-Zone C-Compressed Air System',
    '616-CCPSL-PIP-E3D-Zone C-Compressed Air System - Compressor Room',
    '616-CCPSL-PIP-E3D-Zone C-Phase 2-Compressed Air System',
    '650-CCPSL-PIP-E3D-Rack-Fire Fighting System Diesel Tank Farm Area',
    '650-CCPSL-PIP-E3D-Zone A-Fire Fighting System Diesel Tank Farm Area',
    '650-CCPSL-PIP-E3D-Zone A-Foam System',
    '650-CCPSL-PIP-E3D-Zone B-Fire Fighting System Pumping Station',
    '650-CCPSL-PIP-E3D-Zone C-Fire Fighting System Transformadores',
    '650-CCPSL-PIP-E3D-Zone C-Fire Fighting System Turbinas',
    '707-CCPSL-PIP-E3D-Zone C-Phase 2-HP Feedwater Heating System',
    '710-CCPSL-PIP-E3D-Zone A-Liquid fuel storage and supply system drains',
    '710-CCPSL-PIP-E3D-Zone C-Liquid fuel storage and supply system drains',
    '746-CCPSL-PIP-E3D-Rack-Phase 2-Auxiliar Cooling System',
    '746-CCPSL-PIP-E3D-Zone C-Phase 2-Auxiliar Cooling System',
    '760-CCPSL-PIP-E3D-Zone C-Chemical Dosing System',
    '780-CCPSL-PIP-E3D-Zone C-Phase 2 Auxiliary Interconnectios System',
    '805-CCPSL-PIP-E3D-Zone A-Fire water tanks',
    'DING-INT-ECUASAL-E3D-PIP-Sea water system',
  ]; // Array de tipos de Juntas para el formulario Modal de Agregar Juntas

  especificacionlist = [
    '1A4',
    '15B1',
    '15B1S',
    '1A1',
    '1A2',
    '1A3',
    '1A4',
    '1A6',
    '1AG1',
    '1AG2',
    '1C1',
    '1C2',
    '1P5',
    '1P7',
    '1P8',
    '1P9',
    '1P9HT',
    '3A1',
    '3A2',
    '3A4',
    '3B1',
    '3B2',
    '3C2',
    '6A1',
    '6C2',
    '9A1',
    '9B1',
    'PE',
    '3B1',
  ];

  schedulelist = [
    '80',
    '40S',
    '80',
    'STD',
    '10S',
    '60',
    '160',
    '20',
    'SDR17',
    'PN10',
    'PN6',
    'SDR11',
  ];

  tipoextremolist = [
    'Socketweld',
    'Socketweld',
    'Buttweld',
    'Tapweld',
    'Thread',
    'HDPE-union',
    'GRP-union',
    'Clamp',
  ];

  tipomateriallist = [
    'Carbon steel',
    'Stainless steel',
    'HDPE',
    'GRP',
    'Alloy steel',
    'Unknown',
  ];

  materiallist = [
    'ASTM-A106 GR B',
    'ASTM-A312 GR TP 316L',
    'ASTM-A106 GR B',
    'PE4710',
    'VINYLESTER',
    'ASTM-A335 GR P91',
    'ASTM-A335 GR P22',
    'ASTM-A672 C70 (CLASE 22)',
    'ASTM-A691 CL 21 [2.25CR-1MO]',
    'PIPE - STRAIGHT',
    '100% VINYLESTER',
    'API 5L GR B',
  ];

  factor_pulgadas_diametrales = [
    '1',
    '1,3',
    '1,4',
    '1,5',
    '1,6',
    '1,75',
    '1,8',
    '1,9',
    '2',
    '2,3',
    '4,3',
  ];


   /*
********************************************************************
Validamos el formulario
Representamos y validamos el conjunto de datos para el formulario
********************************************************************
*/


  juntasForm = new FormGroup({
    nominal: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(20),
    ]),
    nominal1: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(20),
    ]),
    lineaOSistema: new FormControl('', [
      Validators.required,

    ]),
    especificacion: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(8),
    ]),
    schedule: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(9),
    ]),
    tipo_extremos: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    tipo_material: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(26),
    ]),
    material: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(43),
    ]),
    diam_inch_contabilizadas: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(6),
      this.onlyNumbersValidator,
    ]),
    factor_pulgadas_diametrales: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(6),
    ]),
    pulgadas_diametrales: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(6),
      this.onlyNumbersValidator,
    ]),
    usuarioID: new FormControl(''),
    proyectID: new FormControl(''),
  });

  SaveCustomer() {
    console.log(this.juntasForm.value);
  }

  clearform() {
    this.juntasForm.reset();
  }



 /*
********************************************************************
Creamos una nueva junta y enviamos los datos al servicio para crearla en la base de datos
********************************************************************
*/

  onJuntaCreate(): void {
    console.log(this.juntasForm.value);
    // Obtén los valores del formulario
    const datosJuntas = this.juntasForm.value;
    // creamos un objeto con los campos que necesitamos enviar al servicio
    const nuevaJunta = {
      /*
      Se utilizan operadores de fusión nula (||) para proporcionar valores predeterminados vacíos en caso de que los campos del formulario
       sean null o undefined
      */
      "nominal": this.juntasForm.value.nominal || '',
      "nominal1": this.juntasForm.value.nominal1 || '',
      "lineaOSistema": this.juntasForm.value.lineaOSistema || '',
      "especificacion": this.juntasForm.value.especificacion || '',
      "schedule": this.juntasForm.value.schedule || '',
      "tipo_extremos": this.juntasForm.value.tipo_extremos || '',
      "tipo_material": this.juntasForm.value.tipo_material || '',
      "material": this.juntasForm.value.material || '',
      "diam_inch_contabilizadas":
        this.juntasForm.value.diam_inch_contabilizadas || '',
        "factor_pulgadas_diametrales":
        this.juntasForm.value.factor_pulgadas_diametrales || '',
        "pulgadas_diametrales": this.juntasForm.value.pulgadas_diametrales || '',
        "usuarioID": this.juntasForm.value.usuarioID || '',
        "proyectID": this.juntasForm.value.proyectID || '',
    };


    /*
********************************************************************
Enviamos la junta al servico para crearla en la base de datos.
********************************************************************
*/


    // Llama al servicio con el objeto creado
    this.juntasService.onJuntaCreate(nuevaJunta).subscribe(
      (response: Junta_interface) => {
        this.allJuntas.push(response);
        // Puedes mostrar un mensaje de éxito aquí si es necesario
        //console.log('Junta creada exitosamente.');
        this.openSnackBar('Junta creada exitosamente', 'Cerrar');
      },
      (error: HttpErrorResponse) => {
        console.error('Error al crear la junta', error);
        this.openSnackBar('Error al crear la junta', 'Cerrar');
        // Muestra un mensaje de error al usuario
      }
    );


  }


     /*
******************************************************************************************
// Validador personalizado para aceptar solo números enteros o decimales Een el formulario
*****************************************************************************************
*/

  onlyNumbersValidator(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;
    const valid = /^\d+(\.\d+)?$/.test(value); // Permite números enteros o decimales

    return valid ? null : { onlyNumbers: true };
  }










}









