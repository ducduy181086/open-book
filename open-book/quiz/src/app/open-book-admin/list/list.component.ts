import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';

import { Store } from '@ngrx/store';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { BookItemView } from '../open-book-admin.type';
import { listSelector, load } from './list.actions';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public bookItems$: Observable<BookItemView[]>;
  public total$: Observable<number>;
  public isLoading$: Observable<boolean>;

  public displayedColumns$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([
    'id', 'county', 'country', 'town', 'description', 'displayableAddress',
    'numberOfBedrooms', 'numberOfBathrooms', 'price', 'propertyType', 'forWhatDescription'
  ]);
  public form: FormGroup<{ keyword: FormControl<string | null> }>;
  public pageSize: number = 5;
  public pageIndex: number = 0;

  constructor(private store: Store, fb: FormBuilder) {
    const state$ = store.select(listSelector);
    this.bookItems$ = state$.pipe(map(state => state.bookItems.map(m => ({ ...m, forWhatDescription: m.forWhat === 0 ? 'For Sale' : 'For Rent' } as BookItemView))));
    this.total$ = state$.pipe(map(state => state.total));
    this.isLoading$ = state$.pipe(map(state => state.isLoading));

    this.form = fb.group({ keyword: '' });
  }

  ngOnInit(): void {
    this.loadData({ keyword: undefined, pageIndex: this.pageIndex, take: this.pageSize });
  }

  onPage(page: PageEvent) {
    this.loadData({ keyword: this.form.value.keyword, pageIndex: page.pageIndex, take: page.pageSize });
  }

  submitFilter() {
    this.loadData({ keyword: this.form.value.keyword, pageIndex: this.pageIndex, take: this.pageSize });
  }

  resetFilter() {
    this.form.reset();
    this.submitFilter();
  }

  loadData(page: { keyword: string | null | undefined, pageIndex: number | undefined, take: number | undefined }): void {
    this.store.dispatch(load(page));
  }
}
