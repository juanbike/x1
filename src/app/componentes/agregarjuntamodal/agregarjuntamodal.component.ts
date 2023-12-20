import {Component} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MatDialogModule
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


/**
 * @title Dialog Animations
 */
@Component({
  selector: 'app-agregarjuntamodal',
  styleUrls: ['agregarjuntamodal.component.css'],
  templateUrl: 'agregarjuntamodal.component.html',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule, MatDialogModule],
})
export class DialogAnimationsExample {
  constructor(public dialog: MatDialog) {}
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AgregarjuntamodalComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

}

@Component({
  selector: 'app-agregarjuntamodal',
  standalone: true,
  imports: [ MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle, MatButtonModule, MatDialogModule ],
  templateUrl: './agregarjuntamodal.component.html',
  styleUrl: './agregarjuntamodal.component.css'
})
export class AgregarjuntamodalComponent {
  constructor(public dialogRef: MatDialogRef<AgregarjuntamodalComponent>) {}

}
