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

  librosMasPopulares: { libro: string, cantidadPrestamos: number }[] = [];


  constructor(private reportesService: ReportesService) { }

  ngOnInit(): void {
    this.obtenerLibrosMasPopulares();

  }


  cargarDatosReporte(): void {

    this.obtenerLibrosMasPopulares();
  }


  obtenerLibrosMasPopulares(): void {
    this.reportesService.getLibrosMasPopulares().subscribe(
      data => {
        this.librosMasPopulares = data;
      },
      error => {
        console.error('Error al obtener los libros más populares', error);
      }
    );
  }

}
