import { createAction, props } from "@ngrx/store";
import { FormState } from "./form-state.interface";

export const formValueChange = createAction(
  "[Form] Value Change",
  props<FormState>()
);

export const delayedFormStateRecieved = createAction(
  "[Form] Delayed Form State Received",
  props<FormState>()
);
