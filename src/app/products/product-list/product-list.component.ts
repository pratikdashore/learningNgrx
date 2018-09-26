import * as productActions from "./../state/product.actions";
import * as fromProduct from "./../state/product.reducer";
import { Component, OnInit, OnDestroy } from "@angular/core";

import { Product } from "../product";
import { ProductService } from "../product.service";
import { Store, select } from "@ngrx/store";
import { takeWhile } from "rxjs/operators";

@Component({
  selector: "pm-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"]
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = "Products";
  errorMessage: string;

  componentActive = false;
  displayCode: boolean;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;

  constructor(private store: Store<fromProduct.State>) {}

  ngOnInit(): void {
    this.store
      .pipe(
        select(fromProduct.getCurrentProduct),
        takeWhile(() => this.componentActive)
      )
      .subscribe(selectedProduct => (this.selectedProduct = selectedProduct));

    this.store.dispatch(new productActions.LoadProducts());

    this.store
      .pipe(
        select(fromProduct.getProducts),
        takeWhile(() => this.componentActive)
      )
      .subscribe((products: Product[]) => (this.products = products));

    this.store
      .pipe(
        select(fromProduct.getShowProductCode),
        takeWhile(() => this.componentActive)
      )
      .subscribe(showProductCode => (this.displayCode = showProductCode));
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  checkChanged(value: boolean): void {
    this.store.dispatch(new productActions.ToggleProductCode(value));
  }

  newProduct(): void {
    this.store.dispatch(new productActions.InitializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(new productActions.SetCurrentProduct(product));
  }
}
