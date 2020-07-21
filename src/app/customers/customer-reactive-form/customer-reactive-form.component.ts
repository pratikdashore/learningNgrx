import { GenericValidator } from './../../shared/generic-validator';
import { MatchValidators } from './../../shared/match.validator';
import { NumberValidators } from './../../shared/number.validator';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Customer } from '../models/customer';
import { distinctUntilChanged, debounce, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'pm-customer-reactive-form',
  templateUrl: './customer-reactive-form.component.html',
  styleUrls: ['./customer-reactive-form.component.css'],
})
export class CustomerReactiveFormComponent implements OnInit {
  customer: Customer = new Customer();

  customerForm: FormGroup;
  genericValidator: GenericValidator;
  errorMessages: { [key: string]: string };

  private validationMessages = {
    firstName: {
      required: 'Please enter your first name.',
      minlength: 'The first name must be longer than 3 characters.',
    },
    lastName: {
      required: 'Please enter your last name.',
      maxlength: 'The last name must be less than 50 characters.',
    },
    emailGroup: {
      mismatch: 'Confirmed email is not matching',
    },
    email: {
      required: 'Please enter your email address.',
      email: 'Please enter a valid email address.',
    },
    confirmEmail: {
      required: 'Please confirm your email address.',
    },
    phone: {
      required: 'Please enter your phone number.',
    },
    rating: {
      range: 'Please enter valid rating.',
    },
  };

  constructor(public fb: FormBuilder) {
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: [
        { value: '', disabled: false },
        [Validators.required, Validators.maxLength(50)],
      ],
      emailGroup: this.fb.group(
        {
          email: [
            { value: '', disabled: false },
            [Validators.required, Validators.email],
          ],
          confirmEmail: ['', [Validators.required, Validators.email]],
        },
        { validator: MatchValidators.stringEqual('email', 'confirmEmail') }
      ),
      phone: '',
      notification: 'email',
      rating: ['', [NumberValidators.range(1, 5)]],
    });

    this.customerForm.get('notification').valueChanges.subscribe((value) => {
      this.onNotificationSet(value);
    });

    this.customerForm.valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe(
        (event) =>
          (this.errorMessages = this.genericValidator.processMessages(
            this.customerForm
          ))
      );
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
