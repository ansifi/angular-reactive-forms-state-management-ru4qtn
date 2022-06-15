import { Component } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { merge, timer, using } from "rxjs";
import { tap } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { delayedFormStateRecieved, formValueChange } from "./form.actions";
import { FormState, initialState } from "./form-state.interface";

@Component({
  selector: "app-ngrx-form",
  template: `
    <form [formGroup]="form" [patchFormGroupValues]="formValues$ | async">
      <input type="text" formControlName="name" />
      <input type="number" formControlName="age" />
    </form>
  `
})
export class NgrxFormComponent {
  form = this.fb.group({
    name1: [initialState.name],
    age1: [initialState.age]
  });

  valueChanges$ = this.form.valueChanges.pipe(
    tap((values: any) => this.store.dispatch(formValueChange(values)))
  );
  delayedFormState$ = timer(4000).pipe(
    tap(() =>
      this.store.dispatch(delayedFormStateRecieved({ name: "Delayed", age: 1 }))
    )
  );
  formValues$ = using(
    () => merge(this.valueChanges$, this.delayedFormState$).subscribe(),
    () => this.store.select(state => state.ngrx) // Wherever you put it in your state tree
  );

  constructor(
    private fb: FormBuilder,
    private store: Store<{ ngrx: FormState }>
  ) {}
}
