import { Component, OnInit, Input } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { FileUploadService } from 'src/services/file-upload.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  @Input() data: { [key: string]: string } | null = null;
  @Input('doc-type') type: string = '';

  errorCodeMapper: { [code: number]: string } = {
    1: $localize`The request couldn't be processed (Error 1).`,
    2: $localize`The request couldn't be processed (Error 2).`,
    3: $localize`The request couldn't be processed (Error 3).`,
    4: $localize`The request couldn't be processed (Error 4).`,
    5: $localize`The request couldn't be processed (Error 5).`,
  };
  selectFileText: string = $localize`Select File`;

  currentFile$: BehaviorSubject<File | undefined> = new BehaviorSubject<File | undefined>(undefined);
  progress$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  message$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  fileName$: BehaviorSubject<string> = new BehaviorSubject<string>(this.selectFileText);

  hasFile$: Observable<boolean> = this.currentFile$.pipe(map(c => c !== undefined));
  hasNotFile$: Observable<boolean> = this.hasFile$.pipe(map(c => !c));
  hasMessage$: Observable<boolean> = this.message$.pipe(map(m => m !== ''));

  constructor(private uploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  selectFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      this.currentFile$.next(file);
      this.fileName$.next(file.name);
    } else {
      this.fileName$.next(this.selectFileText);
    }
  }

  upload(): void {
    this.progress$.next(0);
    this.message$.next('');
    if (this.currentFile$.value) {
      this.uploadService.upload(this.currentFile$.value, this.data, this.type).pipe(
        map(event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress$.next(Math.round(100 * event.loaded / (event.total ?? 1)));
          } else if (event instanceof HttpResponse) {
            this.message$.next(event.body.fileName);
          }
        }),
        catchError((err) => {
          this.progress$.next(0);
          if (err.error && err.error.errorCode) {
            this.message$.next(this.errorCodeMapper[err.error.errorCode]);
          } else {
            this.message$.next($localize`Could not upload the file!`);
          }
          this.currentFile$.next(undefined);
          return of();
        })
      ).subscribe();
    }
  }
}
