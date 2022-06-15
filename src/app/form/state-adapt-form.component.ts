import { Component } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { toSource } from "@state-adapt/core";
import { Adapt } from "@state-adapt/ngrx";
import { timer } from "rxjs";
import { map } from "rxjs/operators";
import { initialState } from "./form-state.interface";

@Component({
  selector: "app-state-adapt-form",
  template: `
    <form [formGroup]="form" [patchFormGroupValues]="formValues$ | async">
      <input type="text" formControlName="name" />
      <input type="number" formControlName="age" />
    </form>
  `
})
export class StateAdaptFormComponent {
  form = this.fb.group({
    name: [initialState.name],
    age: [initialState.age]
  });

  delayedFormState$ = timer(6000).pipe(
    map(() => ({ name: "Delayed", age: 1 })),
    toSource("[Form] Delayed Form State Received")
  );
  valueChanges$ = this.form.valueChanges.pipe(
    toSource("[Form] Value Change")
  );
  formValues$ = this.adapt.updater("stateAdapt", initialState, [
    this.valueChanges$,
    this.delayedFormState$
  ]);

  constructor(private fb: FormBuilder, private adapt: Adapt) {}
}
