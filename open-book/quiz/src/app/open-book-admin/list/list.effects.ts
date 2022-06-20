import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { ListService } from './list.service';
import { load, loadedSuccess, loadedError } from './list.actions';

@Injectable()
export class ListEffects {
  constructor(private actions$: Actions, private service: ListService) { }

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(load),
      mergeMap(m => this.service.getOpenBook(m)
        .pipe(
          map(m => loadedSuccess(m)),
          catchError(() => of(loadedError))
        )
      )
    )
  );
}
