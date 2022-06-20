import { createAction, createSelector, props } from '@ngrx/store';

import { BookItem } from '../open-book-admin.type';

export const ModuleName = 'App/OpenBookAdmin/List';

interface ListState {
  bookItems: BookItem[];
  total: number;
  isLoading: boolean;
}
export const initialState: ListState = { bookItems: [], total: 0, isLoading: false };

export const load = createAction(`${ModuleName}/Load`, props<{ keyword: string | null | undefined, pageIndex: number | undefined, take: number | undefined }>());
export const loadedSuccess = createAction(`${ModuleName}/LoadedSuccess`, props<{ total: number, items: BookItem[] }>());
export const loadedError = createAction(`${ModuleName}/LoadedError`);

export const listSelector = createSelector((store: any) => store[ModuleName], p => p.State as ListState);
