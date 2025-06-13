import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./auth/auth-routing.module').then((m) => m.AuthRoutingModule),
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'clinicas', pathMatch: 'full' },
      {
        path: 'clinicas',
        loadChildren: () =>
          import('./clinics/clinics-routing.module').then(
            (m) => m.ClinicsRoutingModule
          ),
      },
    ],
  },
  { path: '**', redirectTo: 'clinicas' },
];
