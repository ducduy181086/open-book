import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { DetailRoutingModule } from './detail-routing.module';
import { FileUploadModule } from 'src/components/file-upload/file-upload.module';
import { DetailComponent } from './detail.component';
import { ModuleName } from './detail.actions';
import { detailReducer } from './detail.reducer';
import { DetailEffects } from './detail.effects';


@NgModule({
  declarations: [
    DetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DetailRoutingModule,
    FileUploadModule,
    StoreModule.forFeature(ModuleName, { State: detailReducer }),
    EffectsModule.forFeature([DetailEffects])
  ]
})
export class DetailModule { }
