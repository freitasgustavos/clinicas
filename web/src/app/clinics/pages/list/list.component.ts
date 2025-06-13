import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { debounceTime, Subject, takeUntil, distinctUntilChanged } from 'rxjs';
import { ClinicService } from '../../services/clinic.service';
import { Clinic, PaginatedResponse } from '../../models/clinic.model';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  searchControl = new FormControl('');
  isLoading = false;
  clinics: Clinic[] = [];
  paginationData: PaginatedResponse<any> | null = null;

  private destroy$ = new Subject<void>();

  constructor(private clinicService: ClinicService) {}

  ngOnInit(): void {
    this.fetchClinics(1);

    this.searchControl.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((searchTerm) => {
        this.fetchClinics(1, searchTerm || '');
      });
  }

  fetchClinics(page: number, search: string = ''): void {
    this.isLoading = true;
    this.clinicService
      .getClinics(search, page)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.clinics = response.data;
        this.paginationData = response;
        this.isLoading = false;
      });
  }

  onPageChange(page: number): void {
    if (page !== this.paginationData?.current_page) {
      this.fetchClinics(page, this.searchControl.value || '');
    }
  }

  goToPreviousPage(): void {
    if (this.paginationData && this.paginationData.current_page > 1) {
      this.fetchClinics(
        this.paginationData.current_page - 1,
        this.searchControl.value || ''
      );
    }
  }

  goToNextPage(): void {
    if (
      this.paginationData &&
      this.paginationData.current_page < this.paginationData.last_page
    ) {
      this.fetchClinics(
        this.paginationData.current_page + 1,
        this.searchControl.value || ''
      );
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get pages(): number[] {
    if (!this.paginationData) {
      return [];
    }
    return Array.from(
      { length: this.paginationData.last_page },
      (_, i) => i + 1
    );
  }
}
