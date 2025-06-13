import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Toast } from '../../../core/services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
})
export class ToastComponent {
  @Input() toast!: Toast;
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}
