import { createReducer, on } from '@ngrx/store';

import { initialState, load, loadedError, loadedSuccess } from './list.actions';

export const listReducer = createReducer(
  initialState,
  on(load, state => ({ ...state, isLoading: true })),
  on(loadedSuccess, (state, payload) => ({ ...state, isLoading: false, bookItems: payload.items, total: payload.total })),
  on(loadedError, state => ({ ...state, isLoading: false }))
);
