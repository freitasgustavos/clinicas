import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './pages/list/list.component';
import { FormComponent } from './pages/form/form.component';
import { DetailComponent } from './pages/detail/detail.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
  },
  {
    path: 'nova',
    component: FormComponent,
  },
  {
    path: ':id/editar',
    component: FormComponent,
  },
  {
    path: ':id',
    component: DetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClinicsRoutingModule {}
