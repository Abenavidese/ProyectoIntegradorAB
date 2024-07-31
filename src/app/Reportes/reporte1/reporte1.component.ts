import { Component, OnInit } from '@angular/core';
import { ReportesService } from '../../service/reportes.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-reporte1',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './reporte1.component.html',
  styleUrl: './reporte1.component.scss'
})
export default class Reporte1Component implements OnInit {

  // Objeto que almacena la cantidad de préstamos por cada usuario
  cantidadPrestamosPorUsuario: { [username: string]: number } = {};

  constructor(private reportesService: ReportesService) { }

  // Método de inicialización del componente
  ngOnInit(): void {
    // Suscribirse a los datos de préstamos por usuario desde el servicio ReportesService
    this.reportesService.prestamosPorUsuario$.subscribe(
      data => {
        this.cantidadPrestamosPorUsuario = data; // Asignar los datos recibidos a la variable
      },
      error => {
        console.error('Error al recibir los datos de préstamos por usuario:', error); // Manejar errores en la suscripción
      }
    );
  }
}
