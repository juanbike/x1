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
import { ModalComponent } from './modal/modal.component'; //componente modal
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator'; //paginador
import { MatPaginatorModule } from '@angular/material/paginator'; //paginador
import { MatFormFieldModule } from '@angular/material/form-field'; //formulario
import { MatInputModule } from '@angular/material/input'; //input
import { PaginationService } from '../../services/paginacion/pagination.service'; //paginacion
import { MatSort } from '@angular/material/sort'; //ordenamiento
import { ModalagregarjuntaComponent } from './modalagregarjunta/modalagregarjunta.component';
//import { AgregarjuntaService } from '../agregarjunta/service/agregarjunta/agregarjunta.service'; //agregarjunta
//import { AgregarjuntaComponent } from '../agregarjunta/agregarjunta.component';
//import { MatDialog } from '@angular/material/dialog';
//import { AgregarjuntamodalComponent } from '../agregarjuntamodal/agregarjuntamodal.component';

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
  ], //importamos los modulos
  templateUrl: './tabla-juntas.component.html',
  styleUrl: './tabla-juntas.component.css',
})
export class TablaJuntasComponent {
  constructor(
    private http: HttpClient,
    private juntasService: JuntaServiceService,
    private paginationService: PaginationService
  ) {}

  /*
  openDialog(): void {
    const dialogRef = this.dialog.open(AgregarjuntamodalComponent, {
      width: '250px',
    });
  }
*/

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

  //Propiedad utilizada para enviar los datos de la junta al componente modal


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





  //Metodo para obtener los datos de la API y mostrarlos en la tabla
  ngOnInit(): void {
    this.fetchJuntas();
  }

  //Metodo para obtener los datos de la API y mostrarlos en la tabla
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

  //Metodo para eliminar una junta
  OnDeleteClicked(id: string): void {
    this.showConfirmDeleteComponent = true; // Mostrar el componente modal
    // Utiliza el método 'filter' para encontrar el objeto en 'allJuntas' con la propiedad 'id' igual al valor de 'id'.
    const juntaEncontrada = this.juntas.find(
      (junta: { id: string }) => junta.id === id
    );

    if (juntaEncontrada) {
      this.onDeleteJunta(juntaEncontrada.id);

      // Assign the found user to the 'juntaPadre' property of the modal component
      this.juntaPadre = { ...juntaEncontrada }; // Using spread operator to create a copy
      // Muestra el usuario en formato de cadena en la consola
    } else {
      console.log('Usuario no encontrado');
    }
  }

  //Metodo para eliminar una junta

  /*
  onDeleteJunta(id: string): void {
    this.showConfirmDeleteComponent = true; // Mostrar el componente modal
   // Utiliza el método 'filter' para encontrar el objeto en 'allJuntas' con la propiedad 'id' igual al valor de 'id'.
   const usuariosEncontrados = this.juntas.filter(
     (junta: { id: string; }) => junta.id === id
   );
   // Verifica si se encontró algún usuario
   if (usuariosEncontrados.length > 0) {
     // Extrae la información del primer usuario encontrado (puedes ajustar según tus necesidades)
     const usuarioEnString = JSON.stringify(usuariosEncontrados[0]);
     // Convierte la información del usuario a un objeto
     const usuarioEnObjeto = JSON.parse(usuarioEnString);
     console.log('usuarioJson', usuarioEnObjeto);
     // Asigna el objeto a la propiedad 'juntaPadre' del componente modal
     this.juntaPadre = usuarioEnObjeto;
     // Muestra el usuario en formato de cadena en la consola
     console.log(usuarioEnString);
   } else {
     console.log('Usuario no encontrado');
   }
 }


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
        this.handleError('Error al eliminar la junta', error);
      }
    );
  }

  private handleSuccess(message: string): void {
    this.showMessageWithTimeout(message, 3000);
  }

  private handleError(errorMessage: string, error: HttpErrorResponse): void {
    console.error(`${errorMessage}: ${error.message}`);
    // Muestra mensaje de error
    this.showMessageWithTimeout(errorMessage, 3000);
  }







  //Metodo para recibir los datos desde el hijo para ocultar el modal

/*
  recibirDatos(event: boolean) {
    this.showConfirmDeleteComponent = false; // Ocultar el componente modal
    if (!event) {
      this.isJuntaSelected = false;
    }
  }
*/

recibirDatos(event: boolean) {
  this.showConfirmDeleteComponent = false; // Ocultar el componente modal
  }





  OnAddJunta(): void {
    this.showModalAgregarJuntas = true; // Mostrar el componente modal
  }

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
      alert( this.isJuntaSelected);
    }
    this.showModalAgregarJuntas = false; // Ocultar el componente modal
  }

  /*
  abrirModal() {
    this.agregarJuntaService.abrirModal('¡Hola desde el modal!');
  }
*/
}
