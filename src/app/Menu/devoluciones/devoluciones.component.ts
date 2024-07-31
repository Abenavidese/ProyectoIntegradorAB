import { Component, OnInit } from '@angular/core';
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
  prestamos: Prestamo[] = []; // Arreglo que almacena los préstamos pendientes de devolución

  constructor(private prestamoService: PrestamoService) {}

  ngOnInit(): void {
    this.cargarDevolucionesPendientes(); // Carga las devoluciones pendientes al inicializar el componente
  }

  /**
   * Carga la lista de préstamos activos que están pendientes de devolución.
   */
  cargarDevolucionesPendientes(): void {
    this.prestamoService.obtenerPrestamosActivos().subscribe({
      next: (data: Prestamo[]) => {
        this.prestamos = data; // Asigna los préstamos activos a la propiedad prestamos
      },
      error: (error) => {
        console.error('Error al cargar devoluciones pendientes:', error);
      }
    });
  }

  /**
   * Marca un préstamo como devuelto.
   * @param prestamoId - ID del préstamo a devolver
   */
  devolverPrestamo(prestamoId: number): void {
    this.prestamoService.devolverPrestamo(prestamoId).subscribe({
      next: () => {
        console.log('Préstamo devuelto con éxito');
        // Vuelve a cargar las devoluciones pendientes después de devolver un préstamo
        this.cargarDevolucionesPendientes();
      },
      error: (error) => {
        console.error('Error al devolver el préstamo:', error);
      }
    });
  }
}
