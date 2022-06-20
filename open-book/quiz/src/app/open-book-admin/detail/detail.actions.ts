import { createAction, createSelector, props } from '@ngrx/store';

import { BookItem } from '../open-book-admin.type';

export const ModuleName = 'App/OpenBookAdmin/Detail';

interface DetailState {
  model: BookItem | null;
  isLoading: boolean;
}
export const initialState: DetailState = { model: null, isLoading: false };

export const load = createAction(`${ModuleName}/Load`, props<{ id: number }>());
export const loadedSuccess = createAction(`${ModuleName}/LoadedSuccess`, props<{ model: BookItem }>());
export const loadedError = createAction(`${ModuleName}/LoadedError`);
export const reset = createAction(`${ModuleName}/Reset`);

export const detailSelector = createSelector((store: any) => store[ModuleName], p => p.State as DetailState);
