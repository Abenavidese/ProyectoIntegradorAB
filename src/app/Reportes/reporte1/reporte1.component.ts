import { Component, OnInit } from '@angular/core';
import { Libro } from '../../Libro.module';
import { ReportesService } from '../../service/reportes.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Usuario } from '../../Usuario.module';

@Component({
  selector: 'app-reporte1',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './reporte1.component.html',
  styleUrl: './reporte1.component.scss'
})
export default class Reporte1Component implements OnInit {



  librosMasSolicitados: any[] | undefined;
  usuariosMasActivos: any[] | undefined;

  constructor(private reporteService: ReportesService) { }

  ngOnInit(): void {
    this.obtenerTodosLosLibrosMasSolicitados();
    this.obtenerTodosLosUsuariosMasActivos();
  }

  obtenerTodosLosLibrosMasSolicitados(): void {
    this.reporteService.getLibrosMasSolicitados().subscribe(
      data => {
        this.librosMasSolicitados = data;
      },
      error => {
        console.error('Error al obtener todos los libros más solicitados', error);
      }
    );
  }

  obtenerTodosLosUsuariosMasActivos(): void {
    this.reporteService.getUsuariosMasActivos().subscribe(
      data => {
        this.usuariosMasActivos = data;
      },
      error => {
        console.error('Error al obtener todos los usuarios más activos', error);
      }
    );
  }
}