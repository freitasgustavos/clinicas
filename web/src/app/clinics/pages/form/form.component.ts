import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ClinicService } from '../../services/clinic.service';
import { Regional, Specialty } from '../../models/clinic.model';
import { ToastService } from '../../../core/services/toast.service';

function minSelectedCheckboxes(min = 1) {
  return (control: any) => {
    const selected = control.value;
    return selected && selected.length >= min
      ? null
      : { required: true, minSelected: true };
  };
}

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  clinicForm!: FormGroup;
  isEditMode = false;
  isLoading = true;
  isSubmitting = false;
  submitted = false;

  regionals: Regional[] = [];
  specialties: Specialty[] = [];

  private clinicId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private clinicService: ClinicService,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadDropdownData();
    this.checkModeAndLoadData();
  }

  private initForm(): void {
    this.clinicForm = this.fb.group({
      razao_social: ['', Validators.required],
      nome_fantasia: ['', Validators.required],
      cnpj: ['', Validators.required],
      data_inauguracao: ['', Validators.required],
      regional_id: [null, Validators.required],
      ativa: [true],
      specialties: [[], [Validators.required, minSelectedCheckboxes(1)]],
    });
  }

  private loadDropdownData(): void {
    this.clinicService.getRegionals().subscribe((regionals) => {
      this.regionals = regionals;
    });
    this.clinicService.getSpecialties().subscribe((specialties) => {
      this.specialties = specialties;
    });
  }

  private checkModeAndLoadData(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.clinicId = +id;
      this.clinicService.getClinicById(this.clinicId).subscribe((clinic) => {
        this.clinicForm.patchValue(clinic);
        const specialtyIds = clinic.specialties.map((s) => s.id);
        this.clinicForm.get('specialties')?.setValue(specialtyIds);
        this.isLoading = false;
      });
    } else {
      this.isLoading = false;
    }
  }

  get razao_social() {
    return this.clinicForm.get('razao_social');
  }

  get nome_fantasia() {
    return this.clinicForm.get('nome_fantasia');
  }

  get cnpj() {
    return this.clinicForm.get('cnpj');
  }

  get data_inauguracao() {
    return this.clinicForm.get('data_inauguracao');
  }

  get regional_id() {
    return this.clinicForm.get('regional_id');
  }

  get specialty() {
    return this.clinicForm.get('specialties');
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.clinicForm.invalid) {
      this.clinicForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    const formValue = this.clinicForm.value;
    const request$ = this.isEditMode
      ? this.clinicService.updateClinic(this.clinicId!, formValue)
      : this.clinicService.createClinic(formValue);

    request$.subscribe({
      next: () => {
        const msg = `Clínica ${
          this.isEditMode ? 'atualizada' : 'criada'
        } com sucesso!`;
        console.log(msg);
        this.isSubmitting = false;
        this.toastService.show(msg, {
          type: 'success',
        });
        this.router.navigate(['/clinicas']);
      },
      error: (err) => {
        const msg = `Erro ao ${
          this.isEditMode ? 'editar' : 'salvar'
        } a clínica!`;
        this.isSubmitting = false;
        this.toastService.show(msg, {
          type: 'danger',
        });
        console.error(msg, err);
      },
    });
  }

  onDelete(): void {
    if (!this.isEditMode || !this.clinicId) {
      return;
    }

    if (confirm('Tem certeza que deseja excluir esta clínica?')) {
      this.isSubmitting = true;
      this.clinicService.deleteClinic(this.clinicId).subscribe({
        next: () => {
          const msg = 'Clínica excluída com sucesso!';
          this.router.navigate(['/clinicas']);
          this.toastService.show(msg, {
            type: 'success',
          });
          this.isSubmitting = false;
          console.log(msg);
        },
        error: (err) => {
          const msg = 'Erro ao excluir a clínica!';
          this.toastService.show(msg, {
            type: 'danger',
          });
          this.isSubmitting = false;
          console.error(msg, err);
        },
      });
    }
  }
}
