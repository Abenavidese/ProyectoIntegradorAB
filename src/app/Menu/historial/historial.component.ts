import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Prestamo } from '../../Prestamo.module';
import { PrestamoService } from '../../service/prestamo.service';
import { CommonModule } from '@angular/common';
import { ReportesService } from '../../service/reportes.service';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.scss'
})
export default class HistorialComponent implements OnInit {
  prestamos: Prestamo[] = []; // Lista de todos los préstamos
  prestamosPorUsuario: { [username: string]: number } = {}; // Contador de préstamos por usuario

  constructor(
    private prestamoService: PrestamoService,
    private reportesService: ReportesService
  ) { }

  ngOnInit(): void {
    this.cargarHistorial(); // Carga el historial de préstamos al inicializar el componente
  }

  /**
   * Carga el historial de préstamos desde el servicio PrestamoService.
   */
  cargarHistorial(): void {
    this.prestamoService.obtenerPrestamos().subscribe({
      next: (data: Prestamo[]) => {
        this.prestamos = data;
        this.contarPrestamosPorUsuario(); // Cuenta los préstamos por usuario
        this.enviarDatosAlReporte(); // Envía los datos al servicio de reportes
      },
      error: (error) => {
        console.error('Error al cargar historial de préstamos:', error);
      }
    });
  }

  /**
   * Cuenta el número de préstamos por usuario y almacena los resultados en prestamosPorUsuario.
   */
  contarPrestamosPorUsuario(): void {
    this.prestamosPorUsuario = {}; // Resetea el contador
    this.prestamos.forEach(prestamo => {
      const username = prestamo.usuario.username;
      if (this.prestamosPorUsuario[username]) {
        this.prestamosPorUsuario[username]++;
      } else {
        this.prestamosPorUsuario[username] = 1;
      }
    });
  }

  /**
   * Envía los datos de préstamos por usuario al servicio de reportes.
   */
  enviarDatosAlReporte(): void {
    this.reportesService.enviarPrestamosPorUsuario(this.prestamosPorUsuario);
  }
}
