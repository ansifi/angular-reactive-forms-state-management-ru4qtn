import { Action, createReducer, on } from "@ngrx/store";
import { FormState, initialState } from "./form-state.interface";
import { delayedFormStateRecieved, formValueChange } from "./form.actions";

const formReducer = createReducer(
  initialState,
  on(
    formValueChange,
    delayedFormStateRecieved,
    (state, { type, ...update }) => ({ ...state, ...update })
  )
);

export function reducer(state: FormState | undefined, action: Action) {
  return formReducer(state, action);
}
