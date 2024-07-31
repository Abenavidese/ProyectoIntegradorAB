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

  cantidadPrestamosPorUsuario: { [username: string]: number } = {};

  constructor(private reportesService: ReportesService) { }

  ngOnInit(): void {
    this.reportesService.prestamosPorUsuario$.subscribe(
      data => {
        this.cantidadPrestamosPorUsuario = data;
      },
      error => {
        console.error('Error al recibir los datos de préstamos por usuario:', error);
      }
    );
  }
}