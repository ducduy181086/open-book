import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { FileUploadComponent } from './file-upload.component';

const materialModules = [
  MatToolbarModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatProgressBarModule
];

@NgModule({
  declarations: [
    FileUploadComponent
  ],
  imports: [
    CommonModule,
    ...materialModules
  ],
  exports: [
    FileUploadComponent
  ]
})
export class FileUploadModule { }
