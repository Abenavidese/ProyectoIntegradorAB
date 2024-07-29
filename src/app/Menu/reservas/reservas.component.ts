import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth.service';
import { Reserva } from '../../Reserva.module';
import { ReservaService } from '../../service/reserva.service';
import { Libro } from '../../Libro.module';
import { ServiciosService } from '../../service/servicios.service';
import { Usuario } from '../../Usuario.module';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.scss']
})
export default class ReservasComponent implements OnInit {
  reservas?: Reserva[];
  username: string | null = null;
  usuarios: Usuario[] = [];
  libros: Libro[] = [];
  libroId: number | null = null;
  usuarioActual: Usuario | null = null;
  libroActual: Libro | null = null;
  newReserva: Reserva = {
    fechaReserva: '',
    libro: {
      libroId: 0,
      titulo: '',
      autor: '',
      descripcion: '',
      genero: '',
      editorial: '',
      portada: '',
      disponibilidad: false,
      reservado: false
    },
    usuario: {
      usuarioId: 0,
      username: '',
      password: '',
      email: '',
      role: ''
    },
    reservado: true
  };

  successMessage: string = '';
  showSuccess: boolean = false;
  reminders: string[] = [];

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private serviciosService: ServiciosService,
    private reservaService: ReservaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.username = this.authService.getUsername();
    this.libroId = this.authService.getLibroId();
    this.cargarUsuarios();
    this.cargarLibros();
    this.cargarReservasActivas();
  }

  cargarUsuarios(): void {
    this.userService.obtenerUsuarios().subscribe({
      next: (data: Usuario[]) => {
        this.usuarios = data;
        this.filtrarUsuarioActual();
      },
      error: (error) => {
        console.error('Error al cargar usuarios:', error);
      }
    });
  }

  cargarLibros(): void {
    this.reservaService.obtenerLibrosDisponibles().subscribe({
      next: (data: Libro[]) => {
        this.libros = data.filter(libro => libro.disponibilidad);
        this.filtrarLibroActual();
      },
      error: (error) => {
        console.error('Error al cargar libros:', error);
      }
    });
  }

  cargarReservasActivas(): void {
    this.reservaService.obtenerReservasActivas().subscribe({
      next: (data: Reserva[]) => {
        this.reservas = data.filter(reserva => reserva.usuario.username === this.username);
        this.generarRecordatorios();
      },
      error: (error) => {
        console.error('Error al cargar reservas activas:', error);
      }
    });
  }

  filtrarUsuarioActual(): void {
    if (this.username) {
      this.usuarioActual = this.usuarios.find(usuario => usuario.username === this.username) || null;
      if (this.usuarioActual) {
        console.log('Usuario encontrado:', this.usuarioActual);
      } else {
        console.log('Usuario no encontrado');
      }
    }
  }

  filtrarLibroActual(): void {
    if (this.libroId) {
      this.libroActual = this.libros.find(libro => libro.libroId === this.libroId) || null;
      if (this.libroActual) {
        console.log('Libro encontrado:', this.libroActual);
      } else {
        console.log('Libro no encontrado');
      }
    }
  }

  onLibroChange(event: any): void {
    const libroId = +event.target.value;
    this.libroActual = this.libros.find(libro => libro.libroId === libroId) || null;
  }

  createReserva(): void {
    if (this.usuarioActual && this.libroActual) {
      this.newReserva.usuario = this.usuarioActual;
      this.newReserva.libro = this.libroActual;

      const fechaReservaInput = (document.getElementById('fechaReserva') as HTMLInputElement).value;
      
      if (fechaReservaInput) {
        const fechaReserva = new Date(fechaReservaInput);

        const offsetMs = fechaReserva.getTimezoneOffset() * 60 * 1000;
        const fechaReservaLocal = new Date(fechaReserva.getTime() + offsetMs);

        const now = new Date();
        const currentHours = now.getHours();
        const currentMinutes = now.getMinutes();
        const currentSeconds = now.getSeconds();

        fechaReservaLocal.setHours(currentHours, currentMinutes, currentSeconds, 0);

        this.newReserva.fechaReserva = fechaReservaLocal.toISOString();

        const reserva: Reserva = {
          fechaReserva: this.newReserva.fechaReserva,
          libro: this.newReserva.libro,
          usuario: this.newReserva.usuario,
          reservado: true
        };

        this.reservaService.realizarReserva(reserva).subscribe({
          next: (reserva: Reserva) => {
            if (!this.reservas) this.reservas = [];
            this.reservas.push(reserva);
            if (this.libroActual && this.libroActual.libroId !== undefined) {
              this.actualizarDisponibilidadLibro(this.libroActual.libroId, false);
            }
            this.resetForm();
            this.showSuccessMessage(`El libro "${this.libroActual?.titulo}" ha sido reservado exitosamente. Fecha de Reserva: ${this.newReserva.fechaReserva}`);
            this.cargarReservasActivas();  // Volver a cargar las reservas activas después de crear una nueva
          },
          error: (error) => {
            console.error('Error al registrar la reserva:', error);
          }
        });
      } else {
        console.error('Fecha de reserva no proporcionada.');
      }
    } else {
      if (!this.usuarioActual) {
        console.error('Usuario actual no encontrado.');
      }
      if (!this.libroActual) {
        console.error('Libro actual no encontrado.');
      }
    }
  }

  actualizarDisponibilidadLibro(libroId: number, disponibilidad: boolean): void {
    const libro = this.libros.find(libro => libro.libroId === libroId);
    if (libro) {
      libro.disponibilidad = disponibilidad;
      this.serviciosService.actualizarLibro(libro).subscribe({
        next: () => {
          console.log('Disponibilidad del libro actualizada:', libro);
        },
        error: (error) => console.error('Error al actualizar disponibilidad del libro:', error)
      });
    }
  }

  resetForm(): void {
    this.newReserva = {
      fechaReserva: '',
      libro: {
        libroId: 0,
        titulo: '',
        autor: '',
        descripcion: '',
        genero: '',
        editorial: '',
        portada: '',
        disponibilidad: false,
        reservado:false
      },
      usuario: {
        usuarioId: 0,
        username: '',
        password: '',
        email: '',
        role: ''
      },
      reservado: true
    };
  }

  cancelarReserva(reservaId: number): void {
    this.reservaService.cancelarReserva(reservaId).subscribe({
      next: () => {
        console.log(`Reserva con ID ${reservaId} cancelada.`);
        // Actualizar lista de reservas activas
        this.cargarReservasActivas();
      },
      error: (error) => {
        console.error('Error al cancelar la reserva:', error);
      }
    });
  }

  showSuccessMessage(message: string): void {
    this.successMessage = message;
    this.showSuccess = true;
    setTimeout(() => {
      this.showSuccess = false;
      this.successMessage = '';
    }, 5000); // Ocultar el mensaje después de 5 segundos
  }

  generarRecordatorios(): void {
    const now = new Date();
    this.reminders = this.reservas
      ?.filter(reserva => new Date(reserva.fechaReserva) > now)
      .map(reserva => {
        const diasRestantes = Math.ceil((new Date(reserva.fechaReserva).getTime() - now.getTime()) / (1000 * 3600 * 24));
        return `Recordatorio: El libro "${reserva.libro.titulo}" tiene una reserva para dentro de ${diasRestantes} días.`;
      }) || [];
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('role');
    window.location.href = 'http://localhost:8080/biblioteca/LoginUsu.xhtml';
  }
}
