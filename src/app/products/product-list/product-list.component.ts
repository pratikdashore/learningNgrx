import {
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Product } from '../product';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {
  pageTitle = 'Products';
  selectedProduct: Product | null;

  displayCode = true;
  @Input() products: Product[];
  @Input() errorMessage: string;
  @Output() selectProduct = new EventEmitter<Product>();
  @Output() addProduct = new EventEmitter<void>();

  constructor() {}

  checkChanged(value: boolean): void {
    this.displayCode = value;
  }

  newProduct(): void {
    this.addProduct.emit();
  }

  productSelected(product: Product): void {
    this.selectedProduct = product;
    this.selectProduct.emit(product);
  }
}
