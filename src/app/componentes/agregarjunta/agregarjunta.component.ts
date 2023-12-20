import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Dialog, DialogModule} from '@angular/cdk/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';

/**
 * @title CDK Dialog Styling

@Component({
  selector: 'app-agregarjunta',
  templateUrl: './agregarjunta.component.html',
  standalone: true,
  imports: [DialogModule],
})
export class AgregarjuntaComponent1 {
  constructor(public dialog: Dialog) {}

  openDialog(): void {
    this.dialog.open<string>(AgregarjuntaComponent);
  }
}

*/






@Component({
  selector: 'app-agregarjunta',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule,  DialogModule ],
  templateUrl: './agregarjunta.component.html',
  styleUrl: './agregarjunta.component.css'
})
export class AgregarjuntaComponent {
  formulario!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AgregarjuntaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { mensaje: string },
    private formBuilder: FormBuilder
  ) {
    // Inicializa el formulario con 6 campos
    this.formulario = this.formBuilder.group({
      campo1: ['', Validators.required],
      campo2: ['', Validators.required],
      campo3: ['', Validators.required],
      campo4: ['', Validators.required],
      campo5: ['', Validators.required],
      campo6: ['', Validators.required],
    });
  }

  cerrarModal(): void {
    this.dialogRef.close();
    console.log('El modal se cerró');
  }

  onSubmit() {
    // Aquí puedes manejar la lógica cuando se envía el formulario
    console.log(this.formulario.value);
  }
}
