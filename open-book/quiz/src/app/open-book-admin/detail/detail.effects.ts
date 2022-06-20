import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { DetailService } from './detail.service';
import { load, loadedSuccess, loadedError } from './detail.actions';

@Injectable()
export class DetailEffects {
  constructor(private actions$: Actions, private service: DetailService) { }

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(load),
      mergeMap(m => this.service.getBook(m.id)
        .pipe(
          map(m => loadedSuccess(m)),
          catchError(() => of(loadedError))
        )
      )
    )
  );
}
