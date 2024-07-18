import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../../service/servicios.service';
import { Libro } from '../../Libro.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabla',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './tabla.component.html',
  styleUrl: './tabla.component.scss'
})
export default class TablaComponent implements OnInit {

  isEditMode: boolean = false; // Para controlar el modo de edición o creación
  libros?: Libro[];
  newLibro: Libro = { titulo: '', autor: '', descripcion: '', genero: '', editorial: '', portada: '' };
  modalSwitch:boolean=false;

  constructor(private libroService: ServiciosService) { }

  ngOnInit(): void {
    this.cargarLibros();
  }
openmoda(){

  this.modalSwitch=true;
}
  cargarLibros() {
    this.libroService.obtenerLibros().subscribe({
      next: (data: Libro[]) => this.libros = data,
      error: (error: any) => console.error('Error al eliminar cliente:', error)

    });
  }

  

    
  
  

  onSubmit() {
   
  }



  resetForm() {
    this.newLibro = { titulo: '', autor: '', descripcion: '', genero: '', editorial: '', portada: '' };
    this.isEditMode = false; // Cambia al modo de creación
  }

  seleccionarLibro(libro: Libro) {
    this.newLibro = { ...libro }; // Clona el objeto para evitar mutaciones directas
    this.isEditMode = true; // Cambia al modo de edición
  }

}