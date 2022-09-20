import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { EpcDto, EpcEncoding, EpcVersion } from '../dto/epc.dto';

@Component({
  selector: 'app-epc-data',
  templateUrl: './epc-data.component.html',
  styleUrls: ['./epc-data.component.css'],
})
export class EpcDataComponent {
  title = 'EPC Barcode Generator';

  referenceMaxLength = 70;
  amountMax = 1000000000;
  amountMin = 0.01;

  epcForm: UntypedFormGroup;

  @Output()
  epcDataEvent = new EventEmitter<EpcDto>();

  constructor(fb: UntypedFormBuilder) {
    this.epcForm = fb.group({
      bic: new UntypedFormControl(''),
      iban: new UntypedFormControl('', [Validators.required]),
      name: new UntypedFormControl('', [Validators.required]),
      amount: new UntypedFormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.max(this.amountMax),
          Validators.min(this.amountMin),
        ])
      ),
      reference: new UntypedFormControl('', [
        Validators.maxLength(this.referenceMaxLength),
      ]),
    });
  }

  onSubmit() {
    const eventPayload: EpcDto = {
      bic: this.epcForm.controls['bic']?.value,
      name: this.epcForm.controls['name']?.value,
      iban: this.epcForm.controls['iban']?.value,
      amount: this.epcForm.controls['amount']?.value,
      version: EpcVersion.V2,
      encoding: EpcEncoding.UTF8,
      reference: this.epcForm.controls['reference'].value,
    };

    this.epcDataEvent.emit(eventPayload);
  }
}
