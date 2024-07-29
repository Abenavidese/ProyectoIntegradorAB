import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth.service';
import { Prestamo } from '../../Prestamo.module';
import { PrestamoService } from '../../service/prestamo.service';
import { Libro } from '../../Libro.module';
import { ServiciosService } from '../../service/servicios.service';
import { Usuario } from '../../Usuario.module';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-prestamos',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './prestamos.component.html',
  styleUrls: ['./prestamos.component.scss']
})
export default class PrestamosComponent implements OnInit {
  prestamos?: Prestamo[];
  username: string | null = null;
  usuarios: Usuario[] = [];
  libros: Libro[] = [];
  libroId: number | null = null;
  usuarioActual: Usuario | null = null;
  libroActual: Libro | null = null;
  newPrestamo: Prestamo = {
    fechaPrestamo: '',
    fechaDevolucion: '',
    libro: {
      libroId: 0,
      titulo: '',
      autor: '',
      descripcion: '',
      genero: '',
      editorial: '',
      portada: '',
      disponibilidad: false
    },
    usuario: {
      usuarioId: 0,
      username: '',
      password: '',
      email: '',
      role: ''
    }
  };

  successMessage: string = '';
  showSuccess: boolean = false;
  reminders: string[] = [];

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private serviciosService: ServiciosService,
    private prestamoService: PrestamoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.username = this.authService.getUsername();
    this.libroId = this.authService.getLibroId();
    this.cargarUsuarios();
    this.cargarLibros();
    this.cargarPrestamosActivos();
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
    this.prestamoService.obtenerLibrosDisponibles().subscribe({
      next: (data: Libro[]) => {
        this.libros = data.filter(libro => libro.disponibilidad);
        this.filtrarLibroActual();
      },
      error: (error) => {
        console.error('Error al cargar libros:', error);
      }
    });
  }

  cargarPrestamosActivos(): void {
    this.prestamoService.obtenerPrestamosActivos().subscribe({
      next: (data: Prestamo[]) => {
        this.prestamos = data.filter(prestamo => prestamo.usuario.username === this.username);
        this.generarRecordatorios();
      },
      error: (error) => {
        console.error('Error al cargar préstamos activos:', error);
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

  createPrestamo(): void {
    if (this.usuarioActual && this.libroActual) {
      this.newPrestamo.usuario = this.usuarioActual;
      this.newPrestamo.libro = this.libroActual;

      const fechaPrestamoInput = (document.getElementById('fechaPrestamo') as HTMLInputElement).value;
      const fechaDevolucionInput = (document.getElementById('fechaDevolucion') as HTMLInputElement).value;

      if (fechaPrestamoInput && fechaDevolucionInput) {
        const fechaPrestamo = new Date(fechaPrestamoInput);
        const fechaDevolucion = new Date(fechaDevolucionInput);

        const offsetMs = fechaPrestamo.getTimezoneOffset() * 60 * 1000;
        const fechaPrestamoLocal = new Date(fechaPrestamo.getTime() + offsetMs);
        const fechaDevolucionLocal = new Date(fechaDevolucion.getTime() + offsetMs);

        const now = new Date();
        const currentHours = now.getHours();
        const currentMinutes = now.getMinutes();
        const currentSeconds = now.getSeconds();

        fechaPrestamoLocal.setHours(currentHours, currentMinutes, currentSeconds, 0);
        fechaDevolucionLocal.setHours(currentHours, currentMinutes, currentSeconds, 0);

        this.newPrestamo.fechaPrestamo = fechaPrestamoLocal.toISOString();
        this.newPrestamo.fechaDevolucion = fechaDevolucionLocal.toISOString();

        const prestamo: Prestamo = {
          fechaPrestamo: this.newPrestamo.fechaPrestamo,
          fechaDevolucion: this.newPrestamo.fechaDevolucion,
          libro: this.newPrestamo.libro,
          usuario: this.newPrestamo.usuario
        };

        this.prestamoService.realizarPrestamo(prestamo).subscribe({
          next: (prestamo: Prestamo) => {
            if (!this.prestamos) this.prestamos = [];
            this.prestamos.push(prestamo);
            if (this.libroActual && this.libroActual.libroId !== undefined) {
              this.actualizarDisponibilidadLibro(this.libroActual.libroId, false);
            }
            this.resetForm();
            this.showSuccessMessage(`El libro "${this.libroActual?.titulo}" ha sido prestado exitosamente. Fecha de Préstamo: ${this.newPrestamo.fechaPrestamo}, Fecha de Devolución: ${this.newPrestamo.fechaDevolucion}`);
            this.cargarPrestamosActivos();  // Volver a cargar los préstamos activos después de crear uno nuevo
          },
          error: (error) => {
            console.error('Error al registrar el préstamo:', error);
          }
        });
      } else {
        console.error('Fecha de préstamo o devolución no proporcionada.');
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
    this.newPrestamo = {
      fechaPrestamo: '',
      fechaDevolucion: '',
      libro: {
        libroId: 0,
        titulo: '',
        autor: '',
        descripcion: '',
        genero: '',
        editorial: '',
        portada: '',
        disponibilidad: false
      },
      usuario: {
        usuarioId: 0,
        username: '',
        password: '',
        email: '',
        role: ''
      }
    };
  }

  cancelar(): void {
    const libroId = this.authService.getLibroId();
    const disponibilidadOriginal = this.authService.getDisponibilidad();
    if (libroId !== null && disponibilidadOriginal !== null) {
      const libro = this.libros.find(libro => libro.libroId === libroId);
      if (libro) {
        libro.disponibilidad = disponibilidadOriginal;
        this.serviciosService.actualizarLibro(libro).subscribe({
          next: () => {
            console.log('Disponibilidad del libro restaurada:', libro);
            this.router.navigate(['/libros']); // Redirigir al componente Libros
          },
          error: (error) => console.error('Error al restaurar disponibilidad del libro:', error)
        });
      } else {
        console.error('Libro no encontrado para el ID:', libroId);
      }
    }
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
    this.reminders = this.prestamos
      ?.filter(prestamo => new Date(prestamo.fechaDevolucion) > now)
      .map(prestamo => {
        const diasRestantes = Math.ceil((new Date(prestamo.fechaDevolucion).getTime() - now.getTime()) / (1000 * 3600 * 24));
        return `Recordatorio: El libro "${prestamo.libro.titulo}" debe ser devuelto en ${diasRestantes} días.`;
      }) || [];
  }
  logout() {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('role');
    window.location.href = 'http://localhost:8080/biblioteca/LoginUsu.xhtml';
  }




  
  
}
