import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { map, tap, switchMap, takeUntil, filter } from 'rxjs/operators';

import { detailSelector, load, reset, loadedSuccess } from './detail.actions';
import { BookItem } from '../open-book-admin.type';
import { FileUploadComponent } from 'src/components/file-upload/file-upload.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {
  @ViewChild('uploader') uploader: FileUploadComponent | undefined;
  private unSub: Subject<void> = new Subject<void>();

  public model$: Observable<BookItem>;
  public data$: Observable<{ [key: string]: string } | null> | undefined;
  public resetVisible$: Observable<boolean>;
  public countyClass$: Observable<{}> | undefined;
  public countryClass$: Observable<{}> | undefined;
  public townClass$: Observable<{}> | undefined;
  public postcodeClass$: Observable<{}> | undefined;
  public addressClass$: Observable<{}> | undefined;
  public numberOfBedroomsClass$: Observable<{}> | undefined;
  public numberOfBathroomsClass$: Observable<{}> | undefined;
  public priceClass$: Observable<{}> | undefined;
  public propertyTypeClass$: Observable<{}> | undefined;
  public forWhatClass$: Observable<{}> | undefined;

  public form: FormGroup<{
    id: FormControl<number | null>,
    county: FormControl<string | null>,
    country: FormControl<string | null>,
    town: FormControl<string | null>,
    postcode: FormControl<string | null>,
    description: FormControl<string | null>,
    displayableAddress: FormControl<string | null>,
    numberOfBedrooms: FormControl<number | null>,
    numberOfBathrooms: FormControl<number | null>,
    price: FormControl<number | null>,
    propertyType: FormControl<string | null>,
    forWhat: FormControl<number | null>
  }>;

  constructor(fb: FormBuilder, private store: Store, private route: ActivatedRoute) {
    const state$ = store.select(detailSelector);
    this.model$ = state$.pipe(map(m => m.model!));
    //this.data$ = this.model$.pipe(filter(m => m != null), map(m => Object.entries(m).reduce((seed, [key, value]) => ({ ...seed, [key]: value }), {} as { [key: string]: string } | null)));
    this.resetVisible$ = this.model$.pipe(map(m => !m));

    this.form = fb.group({
      id: new FormControl<number | null>(null, []),
      county: new FormControl<string | null>(null, [Validators.required]),
      country: new FormControl<string | null>(null, [Validators.required]),
      town: new FormControl<string | null>(null, [Validators.required]),
      postcode: new FormControl<string | null>(null, [Validators.required]),
      description: new FormControl<string | null>(null, []),
      displayableAddress: new FormControl<string | null>(null, [Validators.required]),
      numberOfBedrooms: new FormControl<number | null>(null, [Validators.required]),
      numberOfBathrooms: new FormControl<number | null>(null, [Validators.required]),
      price: new FormControl<number | null>(null, [Validators.required]),
      propertyType: new FormControl<string | null>(null, [Validators.required]),
      forWhat: new FormControl<number | null>(null, [Validators.required])
    }, { updateOn: 'blur' });

    this.countyClass$ = this.getInvalidClass('county', 'required');
    this.countryClass$ = this.getInvalidClass('country', 'required');
    this.townClass$ = this.getInvalidClass('town', 'required');
    this.postcodeClass$ = this.getInvalidClass('postcode', 'required');
    this.addressClass$ = this.getInvalidClass('displayableAddress', 'required');
    this.numberOfBedroomsClass$ = this.getInvalidClass('numberOfBedrooms', 'required');
    this.numberOfBathroomsClass$ = this.getInvalidClass('numberOfBathrooms', 'required');
    this.priceClass$ = this.getInvalidClass('price', 'required');
    this.propertyTypeClass$ = this.getInvalidClass('propertyType', 'required');
    this.forWhatClass$ = this.getInvalidClass('forWhat', 'required');
  }

  ngOnDestroy(): void {
    this.unSub.next();;
    this.unSub.complete();
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(m => m.get('id') ?? '0'),
      map(m => Number(m)),
      tap(m => {
        if (m > 0) this.store.dispatch(load({ id: m }));
        else {
          this.store.dispatch(reset());
          this.form.patchValue({ id: 0 });
        }
      }),
      takeUntil(this.unSub)
    ).subscribe();

    this.model$.pipe(
      filter(m => m != null),
      tap(m => {
        this.form.setValue({
          id: m.id,
          county: m.county,
          country: m.country,
          town: m.town,
          postcode: m.postcode,
          description: m.description,
          displayableAddress: m.displayableAddress,
          numberOfBedrooms: m.numberOfBedrooms,
          numberOfBathrooms: m.numberOfBathrooms,
          price: m.price,
          propertyType: m.propertyType,
          forWhat: m.forWhat
        });
      }),
      takeUntil(this.unSub)
    ).subscribe();

    this.data$ = this.form.valueChanges.pipe(filter(m => m != null), map(m => Object.entries(m).reduce((seed, [key, value]) => ({ ...seed, [key]: value?.toString() ?? '' }), {} as { [key: string]: string } | null)));
  }

  submit() {
    this.uploader?.upload();
  }

  reset() {
    this.form.reset();
  }

  getInvalid(name: string, validatorName: string): Observable<boolean> | undefined {
    const control = this.form.get(name);
    return control?.statusChanges.pipe(map(m => m === 'INVALID' && !!control?.errors?.[validatorName]));
  }

  getInvalidClass(name: string, validatorName: string): Observable<{}> | undefined {
    return this.getInvalid(name, validatorName)?.pipe(map(m => ({
      'is-invalid': m,
      'is-valid': !m
    })));
  }
}
