import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthorizeGuard } from '../api-authorization/authorize.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./open-book-admin/open-book-admin.module').then(m => m.OpenBookAdminModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
