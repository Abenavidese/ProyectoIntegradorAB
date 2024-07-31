import { Component, OnInit } from '@angular/core';
import { Libro } from '../../Libro.module';
import { ServiciosService } from '../../service/servicios.service';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export default class PerfilComponent implements OnInit {

  isEditMode: boolean = false; // Estado para controlar el modo de edición o creación
  libros?: Libro[]; // Lista de libros
  newLibro: Libro = { titulo: '', autor: '', descripcion: '', genero: '', editorial: '', portada: '', disponibilidad: true, reservado: false }; // Modelo de libro para crear o editar
  modalSwitch: boolean = false; // Estado para el modal

  constructor(private libroService: ServiciosService) { }

  ngOnInit(): void {
    this.cargarLibros(); // Cargar la lista de libros al inicializar el componente
  }

  openmoda(): void {
    this.modalSwitch = true; // Abre el modal
  }

  cargarLibros(): void {
    this.libroService.obtenerLibros().subscribe({
      next: (data: Libro[]) => this.libros = data,
      error: (error: any) => console.error('Error al cargar libros:', error)
    });
  }

  eliminarLibro(libroId: number) {
    this.libroService.eliminarLibro(libroId).subscribe({
      next: () => this.cargarLibros(),
      error: error => console.error('Error al eliminar libro:', error)
    });
  }

  createLibro(): void {
    this.libroService.guardarLibro(this.newLibro).subscribe((libro: Libro) => {
      this.libros?.push(libro); // Añade el nuevo libro a la lista
      this.newLibro = { titulo: '', autor: '', descripcion: '', genero: '', editorial: '', portada: '', disponibilidad: true, reservado: true }; // Reinicia el modelo
      this.resetForm(); // Reinicia el formulario después de crear un libro
    });
  }

  onSubmit(libroForm: NgForm): void {
    if (libroForm.valid) {
      if (this.isEditMode) {
        this.actualizarLibro(); // Actualiza el libro si está en modo edición
      } else {
        this.createLibro(); // Crea un nuevo libro si no está en modo edición
      }
    } else {
      this.markFormAsTouched(libroForm); // Marca el formulario como tocado para mostrar errores
    }
  }

  private markFormAsTouched(libroForm: NgForm): void {
    Object.keys(libroForm.controls).forEach(field => {
      const control = libroForm.controls[field];
      control.markAsTouched({ onlySelf: true }); // Marca cada control como tocado
    });
  }

  actualizarLibro(): void {
    this.libroService.actualizarLibro(this.newLibro).subscribe({
      next: (libroActualizado: any) => {
        console.log('Libro actualizado:', libroActualizado);
        this.cargarLibros(); // Actualiza la lista de libros después de la actualización
        this.resetForm(); // Reinicia el formulario
      },
      error: (error: any) => console.error('Error al actualizar libro:', error)
    });
  }

  resetForm(): void {
    this.newLibro = { titulo: '', autor: '', descripcion: '', genero: '', editorial: '', portada: '', disponibilidad: true, reservado: true }; // Resetea el modelo del libro
    this.isEditMode = false; // Cambia al modo de creación
  }

  seleccionarLibro(libro: Libro): void {
    this.newLibro = { ...libro }; // Clona el objeto para evitar mutaciones directas
    this.isEditMode = true; // Cambia al modo de edición
  }

}
