import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Clinic,
  PaginatedResponse,
  Regional,
  Specialty,
} from '../models/clinic.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClinicService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getClinics(
    search: string = '',
    page: number = 1
  ): Observable<PaginatedResponse<Clinic>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('search', search);

    return this.http.get<PaginatedResponse<Clinic>>(`${this.apiUrl}/clinics`, {
      params,
    });
  }

  getClinicById(id: number): Observable<Clinic> {
    return this.http.get<Clinic>(`${this.apiUrl}/clinics/${id}`);
  }

  getRegionals(): Observable<any[]> {
    return this.http.get<Regional[]>(`${this.apiUrl}/regionals`);
  }

  getSpecialties(): Observable<any[]> {
    return this.http.get<Specialty[]>(`${this.apiUrl}/specialties`);
  }

  createClinic(clinicData: Partial<Clinic>): Observable<Clinic> {
    return this.http.post<Clinic>(`${this.apiUrl}/clinics`, clinicData);
  }

  updateClinic(id: number, clinicData: Partial<Clinic>): Observable<Clinic> {
    return this.http.put<Clinic>(`${this.apiUrl}/clinics/${id}`, clinicData);
  }

  deleteClinic(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/clinics/${id}`);
  }
}
