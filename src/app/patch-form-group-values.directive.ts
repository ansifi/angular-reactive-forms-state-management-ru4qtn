import { Directive, Input } from "@angular/core";

@Directive({
  selector: "[patchFormGroupValues]"
})
export class PatchFormGroupValuesDirective {
  @Input() formGroup: any;
  @Input()
  set patchFormGroupValues(val: any) {
    if (!val) return;
    this.formGroup.patchValue(val, { emitEvent: false });
  }
}
