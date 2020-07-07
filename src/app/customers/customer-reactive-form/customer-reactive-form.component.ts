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
      lastName: '',
      email: '',
    });
  }

  onSave() {
    console.log(JSON.stringify(this.customerForm.value));
  }
}
