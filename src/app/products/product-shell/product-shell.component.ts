import { Component, OnInit, OnDestroy } from '@angular/core';
import * as productActions from './../state/product.actions';
import * as fromProduct from './../state/product.reducer';
import { Store, select } from '@ngrx/store';
import { takeWhile } from 'rxjs/operators';
import { Product } from '../product';
import { Observable } from 'rxjs';
@Component({
  templateUrl: './product-shell.component.html',
})
export class ProductShellComponent implements OnInit, OnDestroy {
  componentActive = true;

  selectedProduct$: Observable<Product>;
  allProducts$: Observable<Product[]>;
  errorMessage$: Observable<string>;

  constructor(private store: Store<fromProduct.State>) {}

  ngOnInit() {
    this.store.dispatch(productActions.loadProducts());

    this.selectedProduct$ = this.store.pipe(
      select(fromProduct.getCurrentProduct),
      takeWhile(() => this.componentActive)
    );

    this.allProducts$ = this.store.pipe(
      select(fromProduct.getProducts),
      takeWhile(() => this.componentActive)
    );

    this.errorMessage$ = this.store.pipe(
      select(fromProduct.getError),
      takeWhile(() => this.componentActive)
    );
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  onSelectProduct(product: Product) {
    this.store.dispatch(productActions.setCurrentProduct({ product }));
  }

  onAddProduct() {
    this.store.dispatch(productActions.initializeCurrentProduct());
  }

  onProductDelete(product: Product) {
    if (product && product.id) {
      if (confirm(`Really delete the product: ${product.productName}?`)) {
        this.store.dispatch(
          productActions.deleteProduct({ productId: product.id })
        );
      }
    } else {
      // No need to delete, it was never saved
      this.store.dispatch(productActions.clearCurrentProduct());
    }
  }

  onProductSave(product: Product) {
    if (product.id === 0) {
      product.id = null;
      this.store.dispatch(productActions.createProduct({ product }));
    } else {
      this.store.dispatch(productActions.updateProduct({ product }));
    }
  }
}
