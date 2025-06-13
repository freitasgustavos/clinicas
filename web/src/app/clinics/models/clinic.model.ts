export interface Regional {
  id: number;
  label: string;
}

export interface Specialty {
  id: number;
  label: string;
  pivot?: { clinic_id: number; specialty_id: number };
}

export interface Clinic {
  id: number;
  razao_social: string;
  nome_fantasia: string;
  data_inauguracao: string;
  cnpj: string;
  ativa: number;
  regional_id: number;
  regional?: Regional;
  specialties: Specialty[];
}

export interface PaginatedResponse<T> {
  current_page: number;
  data: T[];
  last_page: number;
  total: number;
}
