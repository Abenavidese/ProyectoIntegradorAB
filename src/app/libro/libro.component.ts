import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ServiciosService } from '../service/servicios.service';
import { Libro } from '../Libro.module';

@Component({
  selector: 'app-libro',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './libro.component.html',
  styleUrl: './libro.component.scss'
})
export class LibroComponent implements OnInit {

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

  eliminarLibro(libroId: number) {
    this.libroService.eliminarLibro(libroId).subscribe({
      next: () => {
        this.cargarLibros();
        this.openmoda();
      },
      error: (error: any) => {
        console.error('Error al eliminar libro:', error);
      }
    });
  }
  

    
  
  createLibro(): void {
    this.libroService.guardarLibro(this.newLibro).subscribe((libro: Libro) => {
      this.libros?.push(libro);
      this.newLibro = { titulo: '', autor: '', descripcion: '', genero: '', editorial: '', portada: '' };
    });
  }

  onSubmit() {
    if (this.isEditMode) {
      this.actualizarLibro();
    } else {
      this.createLibro();
    }
  }

  actualizarLibro() {
    this.libroService.actualizarLibro(this.newLibro).subscribe({
      next: (libroActualizado: any) => {
        console.log('Libro actualizado:', libroActualizado);
        this.cargarLibros(); // Actualiza la lista de libros después de la actualización
        this.resetForm(); // Reinicia el formulario
      },
      error: (error: any) => console.error('Error al actualizar libro:', error)
    });
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