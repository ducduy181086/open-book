import { createReducer, on } from '@ngrx/store';

import { initialState, load, loadedError, loadedSuccess, reset } from './detail.actions';

export const detailReducer = createReducer(
  initialState,
  on(load, state => ({ ...state, isLoading: true })),
  on(loadedSuccess, (state, payload) => ({ ...state, isLoading: false, model: payload.model })),
  on(loadedError, state => ({ ...state, isLoading: false })),
  on(reset, state => ({ ...state, model: null, isLoading: false }))
);
