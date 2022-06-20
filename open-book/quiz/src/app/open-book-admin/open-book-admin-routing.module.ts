import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpenBookAdminComponent } from './open-book-admin.component';

const routes: Routes = [
  { path: '', component: OpenBookAdminComponent },
  { path: 'list', loadChildren: () => import('./list/list.module').then(m => m.ListModule) },
  { path: 'detail', loadChildren: () => import('./detail/detail.module').then(m => m.DetailModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpenBookAdminRoutingModule { }
