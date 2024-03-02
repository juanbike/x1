import { Component, EventEmitter, Output } from '@angular/core';
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
import { CrudSoldadoresService } from '../../../services/sodadores/crud-soldadores.service'; //servicio de soldadores
import { soldador_interface } from '../../../data/interface/juntas/soldadores/soldadores'; //interface de soldadores




@Component({
  selector: 'app-modal-agregar-soldador',
  standalone: true,
  imports: [

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
  templateUrl: './modal-agregar-soldador.component.html',
  styleUrl: './modal-agregar-soldador.component.css'
})
export class ModalAgregarSoldadorComponent {
  allSoldadores: soldador_interface[] = []; //listado de soldadores


  constructor(
    private http: HttpClient, //inicializamos el http para consumir el servicio de juntas
    private crudSoldadoresService: CrudSoldadoresService, //inicializamos el servicio
    private builder: FormBuilder, //inicializamos el builder para crear el formulario
    private snackBar: MatSnackBar //inicializamos el snackbar para mostrar notificaciones al usuario
  ) {}

  formGroup!: FormGroup; // Defnimos el nombre del Formulario


 /*
 ******************************************************************************************************************
 Hemos creado un EventEmitter llamado miEventoAlPadre que se utiliza para emitir eventos hacia el componente padre.
 ******************************************************************************************************************
 */

  @Output() miEventoAlPadre: EventEmitter<boolean> =
    new EventEmitter<boolean>(); // propiedad 'output'  para enviar datos al componente padre

 /*
 ********************************************************************************************************************
  Es un método que puedes llamar desde tu componente hijo para emitir el evento hacia el componente padre. En este caso,
   estamos emitiendo un valor booleano true, pero podrías emitir cualquier tipo de dato que desees
 ********************************************************************************************************************
 */

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
Validamos el formulario
Representamos y validamos el conjunto de datos para el formulario
********************************************************************
*/


soldadoresForm = new FormGroup({
  nombre: new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20),
  ]),
  apellido: new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20),
  ]),
  identificacion: new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(20),
  ]),
  valores: new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20),
  ]),
  estampa: new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20),
  ]),
  calificacion: new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20),
  ]),
  basemetal: new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20),
  ]),
  numerop: new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(35),
  ]),
});

SaveCustomer() {
  console.log(this.soldadoresForm.value);
}

clearform() {
  this.soldadoresForm.reset();
}



/*
********************************************************************
Creamos una nueva junta y enviamos los datos al servicio para crearla en la base de datos
********************************************************************
*/

onSoldadorCreate(): void {
  console.log(this.soldadoresForm.value);
  // Obtén los valores del formulario
  const datosSoldadores = this.soldadoresForm.value;
  // creamos un objeto con los campos que necesitamos enviar al servicio
  const nuevoSoldador = {
    /*
    Se utilizan operadores de fusión nula (||) para proporcionar valores predeterminados vacíos en caso de que los campos del formulario
     sean null o undefined
    */
     "nombre": this.soldadoresForm.value.nombre || '',
     "apellido": this.soldadoresForm.value.apellido || '',
     "identificacion": this.soldadoresForm.value.identificacion || '',
     "valores": this.soldadoresForm.value.valores || '',
     "estampa": this.soldadoresForm.value.estampa || '',
     "calificacion": this.soldadoresForm.value.calificacion || '',
     "basemetal": this.soldadoresForm.value.basemetal || '',
     "numerop": this.soldadoresForm.value.numerop || ''

  };


  /*
********************************************************************
Enviamos la junta al servico para crearla en la base de datos.
********************************************************************
*/


  // Llama al servicio con el objeto creado
  this.crudSoldadoresService.onCreateSoldador( nuevoSoldador).subscribe(
    (response: soldador_interface) => {
      this.allSoldadores.push(response);
      // Puedes mostrar un mensaje de éxito aquí si es necesario

      this.openSnackBar('El registro del Soldador creado exitosamente', 'Cerrar');
    },
    (error: HttpErrorResponse) => {

      this.openSnackBar('Error al crear el registro del soldador', 'Cerrar');
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
