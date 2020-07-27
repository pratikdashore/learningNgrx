import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenericValidator } from '../../shared/generic-validator';
import { NumberValidators } from '../../shared/number.validator';
import { Product } from '../product';

@Component({
  selector: 'pm-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductEditComponent implements OnInit, OnChanges {
  pageTitle = 'Product Edit';
  errorMessage = '';
  productForm: FormGroup;

  @Input() selectedProduct: Product | null;

  @Output() deleteProduct = new EventEmitter<Product>();
  @Output() saveProduct = new EventEmitter<Product>();

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(private fb: FormBuilder) {
    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      productName: {
        required: 'Product name is required.',
        minlength: 'Product name must be at least three characters.',
        maxlength: 'Product name cannot exceed 50 characters.',
      },
      productCode: {
        required: 'Product code is required.',
      },
      starRating: {
        range: 'Rate the product between 1 (lowest) and 5 (highest).',
      },
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('Called On Changes');

    this.selectedProduct = changes['selectedProduct'].currentValue;
    this.displayProduct();
  }

  ngOnInit(): void {
    // Define the form group
    this.productForm = this.fb.group({
      productName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      productCode: ['', Validators.required],
      starRating: ['', NumberValidators.range(1, 5)],
      description: '',
    });

    this.displayProduct();

    // Watch for value changes
    this.productForm.valueChanges.subscribe(
      (value) =>
        (this.displayMessage = this.genericValidator.processMessages(
          this.productForm
        ))
    );
  }

  // Also validate on blur
  // Helpful if the user tabs through required fields
  blur(): void {
    this.displayMessage = this.genericValidator.processMessages(
      this.productForm
    );
  }

  displayProduct(): void {
    // Set the local product property
    if (this.selectedProduct) {
      // Reset the form back to pristine
      this.productForm.reset();

      // Display the appropriate page title
      if (this.selectedProduct.id === 0) {
        this.pageTitle = 'Add Product';
      } else {
        this.pageTitle = `Edit Product: ${this.selectedProduct.productName}`;
      }

      // Update the data on the form
      this.productForm.patchValue({
        productName: this.selectedProduct.productName,
        productCode: this.selectedProduct.productCode,
        starRating: this.selectedProduct.starRating,
        description: this.selectedProduct.description,
      });
    }
  }

  cancelEdit(): void {
    // Redisplay the currently selected product
    // replacing any edits made
    this.displayProduct();
  }

  onDeleteProduct(): void {
    this.deleteProduct.emit(this.selectedProduct);
  }

  onSaveProduct(): void {
    if (this.productForm.valid) {
      if (this.productForm.dirty) {
        // Copy over all of the original product properties
        // Then copy over the values from the form
        // This ensures values not on the form, such as the Id, are retained
        const newProduct = {
          ...this.selectedProduct,
          ...this.productForm.value,
        };
        this.saveProduct.emit(newProduct);
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }
}
