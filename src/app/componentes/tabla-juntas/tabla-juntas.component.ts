import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

//interface y servicio
import { Junta_interface } from '../../data/interface/juntas/juntas/juntas'; //importamos la interface
import { JuntaServiceService } from '../../services/juntas/junta-service.service'; //importamos el servicio

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
import { ModalagregarjuntaComponent } from './modalagregarjunta/modalagregarjunta.component'; // formulario modal para agregar juntas
import { MatDialog } from '@angular/material/dialog'; //Cuadro de dialogo
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar'; //

import { BoxDialogComponent } from '../box-dialog/box-dialog.component'; //Cuadro de dialogo para eliminar juntas


@Component({
  selector: 'app-tabla-juntas',
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
    ModalagregarjuntaComponent,
    ReactiveFormsModule

  ], //importamos los modulos
  templateUrl: './tabla-juntas.component.html',
  styleUrl: './tabla-juntas.component.css',
})
export class TablaJuntasComponent {
  constructor(
    private http: HttpClient,
    private juntasService: JuntaServiceService, //inicializamos el servicio
    private paginationService: PaginationService, //inicializamos el paginador
    public dialog: MatDialog, //inicializamos el cuadro de dialogo: Eliminar Junta
    private snackBar: MatSnackBar //inicializamos el snackbar para mostrar notificaciones al usuario
  ) {}

  allJuntas: Junta_interface[] = []; //arreglo de juntas
  datosDesdeHijo!: string;
  showMessage: boolean = false; // Variable para controlar la visibilidad del mensaje de confirmacion
  messageText: string = ''; // Variable para el texto del mensaje de confirmacin
  isLoading: boolean = false; // Variable para controlar el estado de la carga de datos
  private apiurl = 'http://localhost:3500/api/juntas/'; // URL de la API
  private isJuntaSelected: boolean = true; // Variable para controlar el estado de la junta seleccionada

  dataSource!: MatTableDataSource<Junta_interface>; // Variable para la fuente de datos de la tabla
  juntas: any; // Variable para la fuente de datos de la tabla

  @ViewChild(MatPaginator) paginator!: MatPaginator; // Variable para el paginador
  @ViewChild(MatSort) sort!: MatSort; // Variable para el sort

  showConfirmDeleteComponent: boolean = false; // Variable para controlar la visibilidad del componente confirm-delete
  showModalAgregarJuntas: boolean = false; // Variable para controlar la visibilidad del componente modal

  //Columnas de la tabla Juntas
  displayedColumns: string[] = [
    'id',
    'nominal',
    'nominal1',
    'lineaOSistema',
    'especificacion',
    'schedule',
    'diam_inch_contabilizadas',
    'factor_pulgadas_diametrales',
    'tipo_extremos',
    'tipo_material',
    'material',
    'pulgadas_diametrales',
    'Acciones',
  ]; // Columnas de la tabla

  /*
********************************************************************
Metodo para obtener los datos de la API y mostrarlos en la tabla
********************************************************************
*/

  ngOnInit(): void {
    this.fetchJuntas();
  }

  /*
********************************************************************
  Metodo para obtener los datos de la API y mostrarlos en la tabla
********************************************************************
*/

  private fetchJuntas() {
    // Muestra un indicador de carga mientras se realiza la solicitud
    this.isLoading = true;
    // Realiza la solicitud HTTP utilizando el servicio 'juntasService'
    this.juntasService.fetchJuntas().subscribe(
      (data) => {
        console.log(data);
        // Almacena los datos de la respuesta en la propiedad 'Juntas'
        this.juntas = data;
        // Asigna los datos a la fuente de datos para renderizar la tabla
        this.dataSource = new MatTableDataSource(this.juntas);

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
        let errorMessage = 'Ocurrió un error al cargar las juntas.';

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
  Metodo para eliminar una junta
********************************************************************
*/

  onDeleteJunta(id: string): void {
    const juntaEncontrada = this.juntas.find(
      (junta: { id: string }) => junta.id === id
    );

    if (juntaEncontrada) {
      this.juntasService.onDeleteJunta(id).subscribe(
        () => {
          // Operación exitosa
          console.log('Junta eliminada');
          this.openSnackBar('Registro eliminado', 'Cerrar');

          this.fetchJuntas(); // Recarga la tabla con los nuevos datos
        },
        (error: HttpErrorResponse) => {
          this.openSnackBar('Ocurrio un error al eliminar una junta', 'Cerrar');
        }
      );
    }
  }

  /*
********************************************************************
  Metodo para ocultar el modal
********************************************************************
*/

  OnAddJunta(): void {
    this.showModalAgregarJuntas = true; // Mostrar el componente modal
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

  recibirDatosdeMA(event: boolean) {
    if (!event) {
      this.isJuntaSelected = true;
      alert(this.isJuntaSelected);
    }
    this.showModalAgregarJuntas = false; // Ocultar el componente modal
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
para el botón y un identificador asociado a la junta que se desea eliminar. Este enfoque es útil para encapsular
la lógica del cuadro de diálogo en un componente separado (BoxDialogComponent).
********************************************************************************************************************
*/

  openConfirmDialog(id: string): void {
    const dialogRef = this.dialog.open(BoxDialogComponent, {
      //data: { id: id },
      width: '250px',
      data: {
        message: '¿Deseas eliminar esta junta?',
        buttonText: 'Eliminar',
        id: id,
      },
    });

    /*
**********************************************************************************************
Este código proporciona una estructura básica para manejar los resultados después de cerrar
un diálogo y realizar acciones específicas en este caso eliminar una junta o no.
************************************************************************************************
*/

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.confirmed) {
        this.onDeleteJunta(result.id);

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
