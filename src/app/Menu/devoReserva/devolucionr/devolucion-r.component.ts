import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservaService } from '../../../service/reserva.service';
import { Reserva } from '../../../Reserva.module';
import { AuthService } from '../../../auth.service';

@Component({
  selector: 'app-devoReserva',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './devolucion-r.component.html',
  styleUrls: ['./devolucion-r.component.scss']
})
export default class DevoReservaComponent implements OnInit {
  reservas: Reserva[] = []; // Almacena las reservas pendientes del usuario
  username: string | null = null; // Almacena el nombre de usuario

  constructor(private reservaService: ReservaService, private authService: AuthService) {}

  ngOnInit(): void {
    this.username = this.authService.getUsername(); // Obtiene el nombre de usuario del servicio de autenticación
    this.cargarReservasPendientes(); // Carga las reservas pendientes al inicializar el componente
  }

  /**
   * Carga las reservas pendientes para el usuario actual.
   */
  cargarReservasPendientes(): void {
    this.reservaService.obtenerReservasActivas().subscribe({
      next: (data: Reserva[]) => {
        // Filtra las reservas para mostrar solo las del usuario actual
        this.reservas = data.filter(reserva => reserva.usuario.username === this.username);
      },
      error: (error) => {
        console.error('Error al cargar reservas pendientes:', error);
      }
    });
  }

  /**
   * Cancela una reserva dada por su ID.
   * @param reservaId - ID de la reserva a cancelar
   */
  cancelarReserva(reservaId: number): void {
    console.log('Enviando solicitud para cancelar reserva con ID:', reservaId);
    this.reservaService.cancelarReserva(reservaId).subscribe({
      next: () => {
        console.log('Reserva cancelada con éxito');
        // Recarga las reservas pendientes después de cancelar una
        this.cargarReservasPendientes();
      },
      error: (error) => {
        console.error('Error al cancelar la reserva:', error);
        console.log('Detalles del error:', error.message);
      }
    });
  }
}
