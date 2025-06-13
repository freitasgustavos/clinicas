import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'danger' | 'info' | 'warning';
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastsSubject = new BehaviorSubject<Toast[]>([]);
  toasts$ = this.toastsSubject.asObservable();

  private toasts: Toast[] = [];

  show(message: string, options: { type: Toast['type'] }) {
    const newToast: Toast = {
      id: Date.now(),
      message,
      ...options,
    };

    this.toasts.push(newToast);
    this.toastsSubject.next([...this.toasts]);

    setTimeout(() => this.remove(newToast.id), 5000);
  }

  remove(id: number) {
    this.toasts = this.toasts.filter((t) => t.id !== id);
    this.toastsSubject.next([...this.toasts]);
  }
}
