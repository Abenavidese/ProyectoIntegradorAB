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
  styleUrls: ['./tabla.component.scss']
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

  openmoda() {
    this.modalSwitch = true;
  }

  cargarLibros() {
    this.libroService.obtenerLibros().subscribe({
      next: (data: Libro[]) => {
        this.libros = data;
        this.filteredLibros = data;
        this.categorias = [...new Set(data.map(libro => libro.genero))]; // Obtiene las categorías únicas
        this.autores = [...new Set(data.map(libro => libro.autor))]; // Obtiene los autores únicos
      },
      error: (error: any) => console.error('Error al cargar libros:', error)
    });
  }

  filtrarLibros() {
    this.filteredLibros = this.libros?.filter(libro => {
      const matchesTitle = libro.titulo.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = this.selectedCategory ? libro.genero === this.selectedCategory : true;
      const matchesAuthor = this.selectedAuthor ? libro.autor === this.selectedAuthor : true;
      const matchesAvailability = this.selectedAvailability ? (this.selectedAvailability === 'disponible' ? libro.disponibilidad : !libro.disponibilidad) : true;
      return matchesTitle && matchesCategory && matchesAuthor && matchesAvailability;
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

<<<<<<< HEAD

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
=======
}
>>>>>>> 6d6d0e0fff36707294c388656b8fb3713dabda74
