import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
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
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: [
        { value: '', disabled: false },
        [Validators.required, Validators.maxLength(50)],
      ],
      email: [
        { value: 'n/a', disabled: false },
        [Validators.required, Validators.email],
      ],
      phone: '',
      notification: 'email',
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

  onNotificationSet(type: string) {
    const phoneCtrl = this.customerForm.get('phone');
    if (type === 'text') {
      phoneCtrl.setValidators([Validators.required]);
    } else {
      phoneCtrl.clearValidators();
    }
    phoneCtrl.updateValueAndValidity();
  }
}
