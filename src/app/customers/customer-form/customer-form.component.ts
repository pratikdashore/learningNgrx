import { NgForm } from '@angular/forms';
import { Customer } from './../models/customer';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pm-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css'],
})
export class CustomerFormComponent implements OnInit {
  customer: Customer = new Customer();
  constructor() {}

  ngOnInit(): void {}

  onSave(formData: NgForm) {
    console.log(formData);
  }
}
