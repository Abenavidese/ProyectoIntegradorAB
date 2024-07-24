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

  usuario: string = ''; // Agrega un campo para el usuario

  isEditMode: boolean = false; // Para controlar el modo de edición o creación
  libros?: Libro[];
  newLibro: Libro = { titulo: '', autor: '', descripcion: '', genero: '', editorial: '', portada: '', disponibilidad: true };
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
    this.newLibro = { titulo: '', autor: '', descripcion: '', genero: '', editorial: '', portada: '', disponibilidad: true };
    this.isEditMode = false; // Cambia al modo de creación
  }

  seleccionarLibro(libro: Libro) {
    this.newLibro = { ...libro }; // Clona el objeto para evitar mutaciones directas
    this.isEditMode = true; // Cambia al modo de edición
  }


  pedirPrestado(libroId?: number) {
    if (libroId === undefined) {
      alert('ID de libro no válido');
      return;
    }
  
    this.libroService.pedirPrestado(libroId).subscribe({
      next: (prestamo) => {
        alert(`Préstamo realizado con éxito: ${prestamo.prestamoId}`);
        this.cargarLibros(); // Actualiza la lista de libros
      },
      error: (error: any) => console.error('Error al pedir prestado:', error)
    });
  }
  
  actualizarDisponibilidad(libro: Libro) {
    libro.disponibilidad = false; // Marcar libro como no disponible
    this.libroService.actualizarDisponibilidad(libro).subscribe({
      next: () => this.cargarLibros(), // Actualiza la lista de libros
      error: (error: any) => console.error('Error al actualizar disponibilidad:', error)
    });
  }
}