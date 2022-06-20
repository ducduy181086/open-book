import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpenBookAdminRoutingModule } from './open-book-admin-routing.module';
import { OpenBookAdminComponent } from './open-book-admin.component';

@NgModule({
  declarations: [
    OpenBookAdminComponent
  ],
  imports: [
    CommonModule,
    OpenBookAdminRoutingModule
  ]
})
export class OpenBookAdminModule { }
