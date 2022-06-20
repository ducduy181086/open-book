import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';
import { ModuleName } from './list.actions';
import { listReducer } from './list.reducer';
import { ListEffects } from './list.effects';

const materialModules = [
  MatTableModule,
  MatPaginatorModule
];

@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...materialModules,
    ListRoutingModule,
    StoreModule.forFeature(ModuleName, { State: listReducer }),
    EffectsModule.forFeature([ListEffects])
  ]
})
export class ListModule { }
