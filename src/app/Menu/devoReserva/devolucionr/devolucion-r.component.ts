// devoReserva.component.ts
import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ReservaService } from '../../../service/reserva.service';
import { Reserva } from '../../../Reserva.module';

@Component({
  selector: 'app-devoReserva',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './devolucion-r.component.html',
  styleUrls: ['./devolucion-r.component.scss']
})
export default class DevoReservaComponent implements OnInit {
  reservas: Reserva[] = [];

  constructor(private reservaService: ReservaService) {}

  ngOnInit(): void {
    this.cargarReservasPendientes();
  }

  cargarReservasPendientes(): void {
    this.reservaService.obtenerReservasActivas().subscribe({
      next: (data: Reserva[]) => {
        this.reservas = data;
      },
      error: (error) => {
        console.error('Error al cargar reservas pendientes:', error);
      }
    });
  }

  devolverReserva(reservaId: number): void {
    if (confirm('¿Estás seguro de que quieres cancelar esta reserva?')) {
      this.reservaService.devolverReserva(reservaId).subscribe({
        next: () => {
          console.log('Reserva cancelada con éxito');
          // Volver a cargar las reservas pendientes
          this.cargarReservasPendientes();
        },
        error: (error) => {
          console.error('Error al cancelar la reserva:', error);
        }
      });
    }
  }
}
