import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AgregarjuntaComponent } from '../../agregarjunta.component';

@Injectable({
  providedIn: 'root'
})
export class AgregarjuntaService {
  constructor(public dialog: MatDialog) {}

  abrirModal(mensaje: string): void {
    const dialogRef = this.dialog.open(AgregarjuntaComponent, {
      height: '400px',
      width: '600px',
      
      panelClass: 'my-dialog',
      data: { mensaje }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal se cerró');
    });
  }
}
