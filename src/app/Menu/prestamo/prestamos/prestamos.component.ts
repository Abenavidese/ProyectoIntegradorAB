import { Component, OnInit } from '@angular/core';
import { Prestamo } from '../../../Prestamo.module';
import { Libro } from '../../../Libro.module';
import { AuthService } from '../../../auth.service';
import { PrestamoService } from '../../../service/prestamo.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../../Usuario.module';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-prestamos',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './prestamos.component.html',
  styleUrls: ['./prestamos.component.scss']
})
export default class PrestamosComponent implements OnInit {
  prestamoForm: FormGroup;
  librosDisponibles: Libro[] = [];
  public usuarioId: number | null | undefined = undefined;
  public currentUser: Usuario | null = null;
  constructor(
    private prestamoService: PrestamoService,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.prestamoForm = this.fb.group({
      libroId: ['', Validators.required],
      fechaPrestamo: ['', Validators.required],
      fechaDevolucion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
      this.usuarioId = user?.usuarioId ?? null;
    });
  }

  cargarLibrosDisponibles(): void {
    this.prestamoService.obtenerLibrosDisponibles().subscribe({
      next: (data: Libro[]) => {
        this.librosDisponibles = data;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al cargar libros disponibles:', error);
      }
    });
  }

  realizarPrestamo(): void {
    if (this.prestamoForm.valid) {
      if (this.usuarioId === undefined) {
        console.error('Usuario no está autenticado');
        return;
      }

      const prestamo: Prestamo = {
        libro: { libroId: this.prestamoForm.value.libroId } as Libro, // Asumimos que solo se necesita el ID para el objeto Libro
        usuario: { usuarioId: this.usuarioId } as any,
        fechaPrestamo: this.prestamoForm.value.fechaPrestamo,
        fechaDevolucion: this.prestamoForm.value.fechaDevolucion
      };

      this.prestamoService.realizarPrestamo(prestamo).subscribe({
        next: () => {
          console.log('Préstamo realizado exitosamente');
          // Agrega lógica para notificar al usuario o redirigir a otra página aquí
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error al realizar préstamo:', error);
        }
      });
    } else {
      console.error('Formulario inválido');
    }
  }}