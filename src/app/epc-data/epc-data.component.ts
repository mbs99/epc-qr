import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-epc-data',
  templateUrl: './epc-data.component.html',
  styleUrls: ['./epc-data.component.css'],
})
export class EpcDataComponent implements OnInit {
  title = 'EPC Barcode Generator';

  referenceMaxLength = 70;
  amountMax = 1000000000;
  amountMin = 0.01;

  epcForm: FormGroup;

  constructor(fb: FormBuilder) {
    this.epcForm = fb.group({
      bic: new FormControl(''),
      iban: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      amount: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.max(this.amountMax),
          Validators.min(this.amountMin),
        ])
      ),
      reference: new FormControl('', [
        Validators.maxLength(this.referenceMaxLength),
      ]),
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    window.alert('onSubmit');
  }
}
