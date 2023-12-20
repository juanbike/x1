import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { JsonplaceholderService } from '../../services/jsonplaceholder/jsonplaceholder.service';


export interface UserData {
  id: string;
  userId: string;
  title: any;
  body: any;
}

@Component({
  selector: 'app-jsonplacerholder',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule],
  templateUrl: './jsonplacerholder.component.html',
  styleUrl: './jsonplacerholder.component.css'
})
export class JsonplacerholderComponent {
  displayedColumns: string[] = ['id', 'userId', 'title', 'body']; //1- Define columnas de la tabla
  dataSource!: MatTableDataSource<UserData>; //1- Define fuente de datos de la tabla
  posts: any; // Define posts

  // Definimos la paginacion
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: JsonplaceholderService) {
    this.service.getData().subscribe((data) => {
      console.log(data);
      this.posts = data; //1- Almacena los posts en la variable posts
       // Assign the data to the data source for the table to render
       this.dataSource = new MatTableDataSource(this.posts); //2- Crea una nueva fuente de datos para la tabla


       this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    // Create 100 users
    // const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));
    // console.log(this.posts);
    // console.log('users', users);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
