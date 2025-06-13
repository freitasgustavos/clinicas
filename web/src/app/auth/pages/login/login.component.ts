import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { finalize } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  showPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['admin@amorsaude.com', [Validators.required, Validators.email]],
      password: ['mudar@123', Validators.required],
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    this.authService
      .login(this.loginForm.value)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => {
          this.toastService.show('Login realizado com sucesso!', {
            type: 'success',
          });
        },
        error: (err) => {
          console.error('Erro no login', err);
          this.toastService.show(
            'E-mail ou senha inválidos. Tente novamente.',
            {
              type: 'danger',
            }
          );
        },
      });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  get email(): AbstractControl {
    return this.loginForm.get('email')!;
  }

  get password(): AbstractControl {
    return this.loginForm.get('password')!;
  }
}
