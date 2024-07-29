import { Component } from '@angular/core';
import { OnInit} from '@angular/core';
import { Prestamo } from '../../Prestamo.module';
import { PrestamoService } from '../../service/prestamo.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-devoluciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './devoluciones.component.html',
  styleUrl: './devoluciones.component.scss'
})
export default class DevolucionesComponent implements OnInit {
  prestamos: Prestamo[] = [];

  constructor(private prestamoService: PrestamoService) {}

  ngOnInit(): void {
    this.cargarDevolucionesPendientes();
  }

  cargarDevolucionesPendientes(): void {
    this.prestamoService.obtenerPrestamosActivos().subscribe({
      next: (data: Prestamo[]) => {
        this.prestamos = data;
      },
      error: (error) => {
        console.error('Error al cargar devoluciones pendientes:', error);
      }
    });
  }

  devolverPrestamo(prestamoId: number): void {
    this.prestamoService.devolverPrestamo(prestamoId).subscribe({
      next: () => {
        console.log('Préstamo devuelto con éxito');
        // Volver a cargar las devoluciones pendientes
        this.cargarDevolucionesPendientes();
      },
      error: (error) => {
        console.error('Error al devolver el préstamo:', error);
      }
    });
  }
}