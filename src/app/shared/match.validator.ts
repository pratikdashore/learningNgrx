import { AbstractControl, ValidatorFn, FormGroup } from '@angular/forms';
export class MatchValidators {
  static stringEqual(
    sourceCtrlNm: string,
    destinationCtrlNm: string
  ): ValidatorFn {
    return function (fg: FormGroup): { [key: string]: boolean } | null {
      const sourceCtrlValue = fg.get(sourceCtrlNm).value;
      const destCtrlValue = fg.get(destinationCtrlNm).value;
      if (destCtrlValue !== null && destCtrlValue !== sourceCtrlValue) {
        return { mismatch: true };
      }
      return null;
    };
  }
}
