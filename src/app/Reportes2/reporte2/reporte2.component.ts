import { Component, OnInit } from '@angular/core';
import { ReportesService } from '../../service/reportes.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reporte2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reporte2.component.html',
  styleUrl: './reporte2.component.scss'
})
export default class Reporte2Component implements OnInit {

  // Almacena una lista de libros más populares con la cantidad de préstamos
  librosMasPopulares: { libro: string, cantidadPrestamos: number }[] = [];

  constructor(private reportesService: ReportesService) { }

  // Método de inicialización del componente
  ngOnInit(): void {
    this.obtenerLibrosMasPopulares();
  }

  // Método para cargar datos del reporte
  cargarDatosReporte(): void {
    this.obtenerLibrosMasPopulares();
  }

  // Método para obtener los libros más populares desde el servicio
  obtenerLibrosMasPopulares(): void {
    this.reportesService.getLibrosMasPopulares().subscribe(
      data => {
        this.librosMasPopulares = data; // Asigna los datos recibidos a la variable
      },
      error => {
        console.error('Error al obtener los libros más populares', error); // Maneja el error si ocurre
      }
    );
  }

}
