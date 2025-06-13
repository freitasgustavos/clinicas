import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Clinic } from '../../models/clinic.model';
import { ClinicService } from '../../services/clinic.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  clinic$!: Observable<Clinic>;
  showSpecialtiesModal = false;

  constructor(
    private route: ActivatedRoute,
    private clinicService: ClinicService
  ) {}

  ngOnInit(): void {
    this.clinic$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const id = Number(params.get('id'));
        return this.clinicService.getClinicById(id);
      })
    );
  }

  openSpecialtiesModal() {
    this.showSpecialtiesModal = true;
  }

  closeSpecialtiesModal() {
    this.showSpecialtiesModal = false;
  }
}
