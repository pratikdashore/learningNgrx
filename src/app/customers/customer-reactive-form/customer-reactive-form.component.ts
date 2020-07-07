import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Customer } from '../models/customer';

@Component({
  selector: 'pm-customer-reactive-form',
  templateUrl: './customer-reactive-form.component.html',
  styleUrls: ['./customer-reactive-form.component.css'],
})
export class CustomerReactiveFormComponent implements OnInit {
  customer: Customer = new Customer();

  customerForm: FormGroup;
  constructor(public fb: FormBuilder) {}

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      firstName: '',
      lastName: { value: '', disabled: false },
      email: [{ value: 'n/a', disabled: true }],
    });
  }

  onSave() {
    console.log(JSON.stringify(this.customerForm.value));
  }

  populateTestData() {
    // setValue to reset all form control values
    // to set only certain form control values use patchValue
    this.customerForm.patchValue({
      firstName: 'Pratik',
      lastName: 'Dashore',
      email: 'test@gmail.com',
    });
  }
}
