import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Prestamo
 } from '../../Prestamo.module';
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

  prestamos: Prestamo[] = [];
  prestamosPorUsuario: { [username: string]: number } = {};

  constructor(private prestamoService: PrestamoService, private reportesService: ReportesService) { }

  ngOnInit(): void {
    this.cargarHistorial();
  }

  cargarHistorial(): void {
    this.prestamoService.obtenerPrestamos().subscribe({
      next: (data: Prestamo[]) => {
        this.prestamos = data;
        this.contarPrestamosPorUsuario();
        this.enviarDatosAlReporte(); // Enviar los datos al servicio de reportes
      },
      error: (error) => {
        console.error('Error al cargar historial de préstamos:', error);
      }
    });
  }

  contarPrestamosPorUsuario(): void {
    this.prestamosPorUsuario = {}; // Resetear el objeto
    this.prestamos.forEach(prestamo => {
      const username = prestamo.usuario.username;
      if (this.prestamosPorUsuario[username]) {
        this.prestamosPorUsuario[username]++;
      } else {
        this.prestamosPorUsuario[username] = 1;
      }
    });
  }

  enviarDatosAlReporte(): void {
    this.reportesService.enviarPrestamosPorUsuario(this.prestamosPorUsuario);
  }
}