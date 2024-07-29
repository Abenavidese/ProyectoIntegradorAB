import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../../service/servicios.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { Libro } from '../../Libro.module';

@Component({
  selector: 'app-tabla',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss']
})
export default class TablaComponent implements OnInit {

  isEditMode: boolean = false;
  libros?: Libro[];
  filteredLibros?: Libro[];
  searchTerm: string = '';
  selectedCategory: string = '';
  selectedAuthor: string = '';
  selectedAvailability: string = '';
  categorias: string[] = [];
  autores: string[] = [];
  newLibro: Libro = { titulo: '', autor: '', descripcion: '', genero: '', editorial: '', portada: '', disponibilidad: true, reservado:true };
  modalSwitch: boolean = false;

  constructor(private libroService: ServiciosService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.cargarLibros();
  }

  openModal() {
    this.modalSwitch = true;
  }

  cargarLibros() {
    this.libroService.obtenerLibros().subscribe({
      next: (data: Libro[]) => {
        this.libros = data;
        this.filteredLibros = data;
        this.categorias = [...new Set(data.map(libro => libro.genero))];
        this.autores = [...new Set(data.map(libro => libro.autor))];
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
    // Implementa la lógica para el formulario si es necesario
  }

  resetForm() {
    this.newLibro = { titulo: '', autor: '', descripcion: '', genero: '', editorial: '', portada: '', disponibilidad: true, reservado:true };
    this.isEditMode = false;
  }

  pedirLibro(libroId: number | undefined) {
    if (libroId !== undefined) {
      this.authService.setLibroId(libroId);
      this.router.navigate(['/prestamos']); 
    } else {
      console.error('No se encontró el id');
    }
  }
}
