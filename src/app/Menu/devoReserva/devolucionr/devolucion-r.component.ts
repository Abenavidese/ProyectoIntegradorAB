// devoReserva.component.ts
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
  reservas: Reserva[] = [];
  username: string | null = null;

  constructor(private reservaService: ReservaService, private authService: AuthService) {}

  ngOnInit(): void {
    this.username = this.authService.getUsername();
    this.cargarReservasPendientes();
  }

  cargarReservasPendientes(): void {
    this.reservaService.obtenerReservasActivas().subscribe({
      next: (data: Reserva[]) => {
        // Filtrar reservas por el usuario actual
        this.reservas = data.filter(reserva => reserva.usuario.username === this.username);
      },
      error: (error) => {
        console.error('Error al cargar reservas pendientes:', error);
      }
    });
  }

  cancelarReserva(reservaId: number): void {
    console.log('Enviando solicitud para cancelar reserva con ID:', reservaId);
    this.reservaService.cancelarReserva(reservaId).subscribe({
      next: () => {
        console.log('Reserva cancelada con éxito');
        // Volver a cargar las reservas pendientes
        this.cargarReservasPendientes();
      },
      error: (error) => {
        console.error('Error al cancelar la reserva:', error);
        console.log('Detalles del error:', error.message);
      }
    });
  }

  
}
