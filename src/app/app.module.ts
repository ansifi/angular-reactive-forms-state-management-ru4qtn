import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import {
  adaptReducer,
  actionSanitizer,
  stateSanitizer
} from "@state-adapt/core";

import { AppComponent } from "./app.component";
import { reducer } from "./form/form.reducer";
import { PatchFormGroupValuesDirective } from "./patch-form-group-values.directive";
import { NgrxFormComponent } from "./form/ngrx-form.component";
import { StateAdaptFormComponent } from "./form/state-adapt-form.component";
import { SetValueDirective } from "./set-value.directive";
import { StateAdaptAdvancedFormComponent } from "./form/state-adapt-advanced-form.component";

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ ngrx: reducer, adapt: adaptReducer }),
    StoreDevtoolsModule.instrument({
      actionSanitizer,
      stateSanitizer
    })
  ],
  declarations: [
    AppComponent,
    PatchFormGroupValuesDirective,
    NgrxFormComponent,
    StateAdaptFormComponent,
    SetValueDirective,
    StateAdaptAdvancedFormComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
