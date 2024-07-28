import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Prestamo
 } from '../../Prestamo.module';
 import { PrestamoService } from '../../service/prestamo.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.scss'
})
export default class HistorialComponent implements OnInit {


  prestamos: Prestamo[] = [];

  constructor(private prestamoService: PrestamoService) { }

  ngOnInit(): void {
    this.cargarHistorial();
  }

  cargarHistorial(): void {
    this.prestamoService.obtenerPrestamos().subscribe({
      next: (data: Prestamo[]) => {
        this.prestamos = data;
      },
      error: (error) => {
        console.error('Error al cargar historial de préstamos:', error);
      }
    });
  }
}


