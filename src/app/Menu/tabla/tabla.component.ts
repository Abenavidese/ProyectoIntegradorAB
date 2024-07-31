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

  isEditMode: boolean = false; // Modo de edición para manejar la adición/edición de libros
  libros?: Libro[]; // Lista de libros cargados desde el servicio
  filteredLibros?: Libro[]; // Lista filtrada de libros para mostrar en la tabla
  searchTerm: string = ''; // Término de búsqueda para filtrar libros por título
  selectedCategory: string = ''; // Categoría seleccionada para filtrar libros
  selectedAuthor: string = ''; // Autor seleccionado para filtrar libros
  selectedAvailability: string = ''; // Disponibilidad seleccionada para filtrar libros
  categorias: string[] = []; // Lista de categorías únicas extraídas de los libros
  autores: string[] = []; // Lista de autores únicos extraídos de los libros
  newLibro: Libro = { titulo: '', autor: '', descripcion: '', genero: '', editorial: '', portada: '', disponibilidad: true, reservado: true }; // Modelo para un nuevo libro
  modalSwitch: boolean = false; // Estado del modal para añadir/editar libros

  constructor(private libroService: ServiciosService, private authService: AuthService, private router: Router) { }

  // Método de inicialización del componente
  ngOnInit(): void {
    this.cargarLibros(); // Carga la lista de libros al iniciar el componente
  }

  // Abre el modal para añadir/editar libros
  openModal() {
    this.modalSwitch = true;
  }

  // Carga los libros desde el servicio y filtra categorías y autores únicos
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

  // Filtra la lista de libros según los criterios seleccionados (título, categoría, autor, disponibilidad)
  filtrarLibros() {
    this.filteredLibros = this.libros?.filter(libro => {
      const matchesTitle = libro.titulo.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = this.selectedCategory ? libro.genero === this.selectedCategory : true;
      const matchesAuthor = this.selectedAuthor ? libro.autor === this.selectedAuthor : true;
      const matchesAvailability = this.selectedAvailability ? (this.selectedAvailability === 'disponible' ? libro.disponibilidad : !libro.disponibilidad) : true;
      return matchesTitle && matchesCategory && matchesAuthor && matchesAvailability;
    });
  }

  // Lógica para el envío de formularios (no implementada aquí)
  onSubmit() {
    // Implementa la lógica para el formulario si es necesario
  }

  // Restablece el formulario y desactiva el modo de edición
  resetForm() {
    this.newLibro = { titulo: '', autor: '', descripcion: '', genero: '', editorial: '', portada: '', disponibilidad: true, reservado: true };
    this.isEditMode = false;
  }

  // Navega a la ruta de préstamos con el ID del libro seleccionado
  pedirLibro(libroId: number | undefined) {
    if (libroId !== undefined) {
      this.authService.setLibroId(libroId);
      this.router.navigate(['/prestamos']); 
    } else {
      console.error('No se encontró el id');
    }
  }
}
