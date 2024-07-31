import { Component } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-loading-overlay',
  standalone: true,
  imports: [],
  templateUrl: './loading-overlay.component.html',
  styleUrl: './loading-overlay.component.scss'
})
export class LoadingOverlayComponent {

  @Input() isLoading: boolean = false;
  @Input() message: string = 'Espere mientras realizamos la operación';

}
