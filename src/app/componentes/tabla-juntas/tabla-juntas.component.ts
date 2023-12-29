import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

//interface y servicio
import { Junta_interface } from '../../data/interface/juntas'; //importamos la interface
import { JuntaServiceService } from '../../data/junta-service.service'; //importamos el servicio

//modulos de angular material
import { MatTableModule, MatTableDataSource } from '@angular/material/table'; //tabla
import { MatButtonModule } from '@angular/material/button'; //botones
import { MatIconModule } from '@angular/material/icon'; //iconos
import { ModalComponent } from './modal/modal.component'; //componente modal para eliminar una junta
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator'; //paginador
import { MatPaginatorModule } from '@angular/material/paginator'; //paginador
import { MatFormFieldModule } from '@angular/material/form-field'; //formulario
import { MatInputModule } from '@angular/material/input'; //input
import { PaginationService } from '../../services/paginacion/pagination.service'; //paginacion
import { MatSort } from '@angular/material/sort'; //ordenamiento
import { ModalagregarjuntaComponent } from './modalagregarjunta/modalagregarjunta.component';
import { MatDialog } from '@angular/material/dialog'; //Cuadro de dialogo
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

import { BoxDialogComponent } from '../box-dialog/box-dialog.component';

import { NotificationsComponent } from '../notifications/notifications.component';
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
    ModalComponent,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    ModalagregarjuntaComponent,
    ReactiveFormsModule,
    NotificationsComponent,
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
Muestra una cuadro de notificación al usuario.
********************************************************************
*/


  openConfirmDialog(): void {
    const dialogRef = this.dialog.open(BoxDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.openSnackBar('Registro eliminado', 'Cerrar');
        // El usuario hizo clic en "Eliminar"
        // Aquí puedes implementar la lógica de eliminación del registro
        console.log('Registro eliminado');
      } else {
        // El usuario hizo clic en "Cancelar" o cerró el cuadro de diálogo
        console.log('Eliminación cancelada');
        this.openSnackBar('Eliminación cancelada', 'Cerrar');
      }
    });
  }



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
********************************************************************************************
Relenamos el Json JuntaPadre con datos para enviarlos al componente modal modal.component.ts
*********************************************************************************************
*/

  juntaPadre: {
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
  } = {
    id: 58,
    nominal: ' 32"',
    nominal1: '32',
    lineaOSistema: ' DING-INT-ECUASAL-E3D-PIP-Sea water system',
    especificacion: 'A',
    schedule: 'SDT',
    tipo_extremos: ' Buttweld',
    tipo_material: 'Carbon steel',
    material: ' API 5L GR B',
    diam_inch_contabilizadas: '45',
    factor_pulgadas_diametrales: '1',
    pulgadas_diametrales: '1',
    fecha: '2023-10-14T11:33:51.858Z',
    proyectID: '2',
    usuarioID: '2',
  };



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
      },
      // Maneja errores en la solicitud HTTP
      (error: HttpErrorResponse) => {
        this.isLoading = false;
        // Mejora: Muestra un mensaje de error más amigable
        console.error('Error al cargar juntas:', error);
        alert('Ocurrio un error al cargar las juntas. Por favor, reintente.');
      }
    );
  }

  //Metodo para mostrar el mensaje al usuario
  showMessageWithTimeout(message: string, timeout: number): void {
    this.showMessage = true;
    this.messageText = message;

    setTimeout(() => {
      this.showMessage = false;
      this.messageText = '';
    }, timeout);
  }



  /*
********************************************************************
  Metodo para encontrar una junta
********************************************************************
*/


  OnDeleteClicked(id: string): void {
    this.showConfirmDeleteComponent = true; // Mostrar el componente modal
    // Utiliza el método 'filter' para encontrar el objeto en 'allJuntas' con la propiedad 'id' igual al valor de 'id'.
    const juntaEncontrada = this.juntas.find(
      (junta: { id: string }) => junta.id === id
    );

    if (juntaEncontrada) {
      this.onDeleteJunta(juntaEncontrada.id);

      // Asignar el usuario encontrado a la propiedad 'juntaPadre' del componente modal
      this.juntaPadre = { ...juntaEncontrada }; // Using spread operator to create a copy
      // Muestra el usuario en formato de cadena en la consola
    } else {
      console.log('Usuario no encontrado');
    }
  }


  /*
********************************************************************
  Metodo para eliminar una junta
********************************************************************
*/


  onDeleteJunta(id: string): void {
    this.juntasService.onDeleteJunta(id).subscribe(
      () => {
        // Operación exitosa
        console.log('Junta eliminada');
        this.showMessageWithTimeout('Junta eliminada con éxito', 3000);
        this.fetchJuntas(); // Recarga la tabla con los nuevos datos
      },
      (error: HttpErrorResponse) => {
        //this.handleError('Error al eliminar la junta', error);
      }
    );
  }



/*
********************************************************************
  Metodo para ocultar el modal
********************************************************************
*/


  recibirDatos(event: boolean) {
    this.showConfirmDeleteComponent = false; // Ocultar el componente modal
  }

  OnAddJunta(): void {
    this.showModalAgregarJuntas = true; // Mostrar el componente modal
  }


  /*
********************************************************************
  Metodo para filtar los datos de la tabla
********************************************************************
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




}
