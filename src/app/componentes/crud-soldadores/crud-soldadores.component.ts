import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

//interface y servicio
import { soldador_interface } from '../../data/interface/juntas/soldadores/soldadores';
import { CrudSoldadoresService } from '../../services/sodadores/crud-soldadores.service';


//modulos de angular material
import { MatTableModule, MatTableDataSource } from '@angular/material/table'; //tabla
import { MatButtonModule } from '@angular/material/button'; //botones
import { MatIconModule } from '@angular/material/icon'; //iconos
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator'; //paginador
import { MatPaginatorModule } from '@angular/material/paginator'; //paginador
import { MatFormFieldModule } from '@angular/material/form-field'; //formulario
import { MatInputModule } from '@angular/material/input'; //input
import { PaginationService } from '../../services/paginacion/pagination.service'; //paginacion
import { MatSort } from '@angular/material/sort'; //ordenamiento
import { ModalAgregarSoldadorComponent } from './modal-agregar-soldador/modal-agregar-soldador.component';



import { MatDialog } from '@angular/material/dialog'; //Cuadro de dialogo
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar'; //

import { BoxDialogComponent } from '../box-dialog/box-dialog.component'; //Cuadro de dialogo para eliminar Soldadoress



@Component({
  selector: 'app-crud-soldadores',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    RouterOutlet,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    ModalAgregarSoldadorComponent,
    ReactiveFormsModule
  ],

  templateUrl: './crud-soldadores.component.html',
  styleUrl: './crud-soldadores.component.css'
})
export class CrudSoldadoresComponent {

  constructor(
    private http: HttpClient,
    private crudSoldadoresService: CrudSoldadoresService, //inicializamos el servicio
    private paginationService: PaginationService, //inicializamos el paginador
    public dialog: MatDialog, //inicializamos el cuadro de dialogo: Eliminar Soldadores
    private snackBar: MatSnackBar //inicializamos el snackbar para mostrar notificaciones al usuario
  ) {}

  dataSource!: MatTableDataSource<soldador_interface>; // Variable para la fuente de datos de la tabla
  soldadores:any // Variable para almacenar los datos de la API
  private isSoldadorSelected: boolean = true; // Variable para controlar el estado de la junta seleccionada
  showModalAgregarSoldadores: boolean = false; // Variable para controlar la visibilidad del componente modal
  messageText: string = ''; // Variable para el texto del mensaje de confirmacin
  //showModalAgregarJuntas: boolean = false; // Variable para controlar la visibilidad del componente modal

  @ViewChild(MatPaginator) paginator!: MatPaginator; // Variable para el paginador
  @ViewChild(MatSort) sort!: MatSort; // Variable para el sort

//Columnas de la tabla Juntas
displayedColumns: string[] = [
  'id',
  'nombre',
  'apellido',
  'identificacion',
  'valores',
  'estampa',
  'calificacion',
  'basemetal',
  'numerop',
  'Acciones',
]; // Columnas de la tabla




  /*
********************************************************************
Metodo para obtener los datos de la API y mostrarlos en la tabla
********************************************************************
*/

ngOnInit(): void {
  this.fetchSoldadoress();
}

/*
********************************************************************
Metodo para obtener los datos de la API y mostrarlos en la tabla
********************************************************************
*/

private fetchSoldadoress() {

  // Realiza la solicitud HTTP utilizando el servicio 'SoldadoressService'
  this.crudSoldadoresService.fetchSoldadores().subscribe(
    (data) => {
      console.log(data);
      // Almacena los datos de la respuesta en la propiedad 'Soldadoress'
      this.soldadores = data;
      // Asigna los datos a la fuente de datos para renderizar la tabla
      this.dataSource = new MatTableDataSource(this.soldadores);

      this.dataSource.paginator = this.paginator; // Asigna el paginador a la fuente de datos
      this.dataSource.sort = this.sort; // Asigna el sort a la fuente de datos
      this.openSnackBar(
        'Recuperando registros de la base de datos',
        'Cerrar'
      );
    },
    // Maneja errores en la solicitud HTTP
    (error: HttpErrorResponse) => {
      // Manejo de errores más detallado
      let errorMessage = 'Ocurrió un error al cargar las Soldadoress.';

      if (error.status === 0) {
        errorMessage =
          'No se pudo conectar al servidor. Verifique su conexión a internet.';
      } else if (error.status >= 400 && error.status < 500) {
        // Errores del lado del cliente (por ejemplo, errores de validación)
        errorMessage =
          'Error en la solicitud. Verifique los datos ingresados.';
          if(error.status == 400){
            errorMessage = 'La solicitud no pudo ser entendida o procesada por el servidor debido a una sintaxis incorrecta o a parámetros inválidos..'
          } else if (error.status == 401){
            errorMessage = 'El cliente debe autenticarse para obtener la respuesta solicitada.'
          } else if (error.status == 403){
            errorMessage = 'El cliente no tiene los privilegios necesarios para obtener la respuesta solicitada.'
          } else if (error.status == 404){
            errorMessage = 'El recurso solicitado no fue encontrado en el servidor'
          } else if (error.status == 405){
            errorMessage = 'El servidor no admite la solicitud HTTP solicitada.'
          }
      } else if (error.status >= 500) {
        // Errores del lado del servidor
        errorMessage =
          'Error interno del servidor. Inténtelo de nuevo más tarde o contacte a soporte técnico.';
      }
      // Muestra un mensaje de error utilizando MatSnackBar
      this.openSnackBar(errorMessage, 'Cerrar');
    }
  );
}

/*
********************************************************************
Metodo para eliminar una Soldadores
********************************************************************
*/

onDeleteSoldadores(id: string): void {
  const SoldadoresEncontrada = this.soldadores.find(
    (Soldadores: { id: string }) => Soldadores.id === id
  );

  if (SoldadoresEncontrada) {
    this.crudSoldadoresService.onDeleteSoldador(id).subscribe(
      () => {
        // Operación exitosa
        console.log('Soldadores eliminada');
        this.openSnackBar('Registro eliminado', 'Cerrar');

        this.fetchSoldadoress(); // Recarga la tabla con los nuevos datos
      },
      (error: HttpErrorResponse) => {
        this.openSnackBar('Ocurrio un error al eliminar una Soldadores', 'Cerrar');
      }
    );
  }
}

/*
********************************************************************
Metodo para ocultar el modal
********************************************************************
*/

OnAddSoldadores(): void {
  this.showModalAgregarSoldadores = true; // Mostrar el componente modal
}

/*
*********************************************************************************************************************************************
Metodo para filtar los datos de la tabla
Este método se utiliza para aplicar un filtro a una fuente de datos, probablemente a través de un campo de entrada.

El método applyFilter toma un parámetro event de tipo Event, que generalmente se pasa desde el evento input en el campo de entrada.
La línea const filterValue = (event.target as HTMLInputElement).value; obtiene el valor del campo de entrada y lo asigna a la variable filterValue.
A continuación, se aplica el filtro a la fuente de datos utilizando this.dataSource.filter = filterValue.trim().toLowerCase();.

Esto asume que this.dataSource es una instancia de MatTableDataSource o una clase similar que tiene una propiedad filter para aplicar el filtro.
Si la fuente de datos tiene paginación habilitada (this.dataSource.paginator), se llama al método firstPage() en el paginador para volver
a la primera página de resultados.
**************************************************************************************************************************************************
*/
// Metodo para filtrar la tabla
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}


/*
***************************************************************************************************************************
Este método maneja un evento que proviene del componente hijo. Si el evento es false, establece isSoldadorSelected en true,
 muestra una alerta con el valor actual de isSoldadorSelected, oculta un componente modal y luego realiza una solicitud
HTTP  para cargar los soldadores nuevamente.
***************************************************************************************************************************
*/


recibirDatosdeMA(event: boolean) {
  if (!event) {
    this.isSoldadorSelected = true;
    alert(this.isSoldadorSelected);
  }
  this.showModalAgregarSoldadores = false; // Ocultar el componente modal
  this.fetchSoldadoress();
}

/*
********************************************************************
configuramos el snackbar Muestra una notificación al usuario.
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
******************************************************************************************************************
este código abre un cuadro de diálogo de confirmación utilizando Angular Material, pasando un mensaje, un texto
para el botón y un identificador asociado a la Soldadores que se desea eliminar. Este enfoque es útil para encapsular
la lógica del cuadro de diálogo en un componente separado (BoxDialogComponent).
********************************************************************************************************************
*/

openConfirmDialog(id: string): void {
  const dialogRef = this.dialog.open(BoxDialogComponent, {
    //data: { id: id },
    width: '250px',
    data: {
      message: '¿Deseas eliminar esta Soldadores?',
      buttonText: 'Eliminar',
      id: id,
    },
  });

  /*
**********************************************************************************************
Este código proporciona una estructura básica para manejar los resultados después de cerrar
un diálogo y realizar acciones específicas en este caso eliminar una Soldadores o no.
************************************************************************************************
*/

  dialogRef.afterClosed().subscribe((result) => {
    if (result && result.confirmed) {
      this.onDeleteSoldadores(result.id);

      // El usuario hizo clic en "Eliminar"

      console.log('Registro eliminado');
    } else {
      // El usuario hizo clic en "Cancelar" o cerró el cuadro de diálogo
      console.log('Eliminación cancelada');
      this.openSnackBar('Eliminación cancelada', 'Cerrar');
    }
  });
}


}
