import { ProductService } from './../product.service';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as productActions from './product.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Product } from '../product';
import { of, merge } from 'rxjs';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}

  @Effect()
  loadProducts$ = this.actions$.pipe(
    ofType(productActions.ProductActionTypes.LoadProducts), // filter out the action which you need to look for
    mergeMap((action: productActions.LoadProducts) =>
      this.productService.getProducts().pipe(
        // do the effect(aysnc task)
        map(
          (products: Product[]) =>
            new productActions.LoadProductsSuccess(products)
        ),
        catchError((error) => of(new productActions.LoadProductsFail(error)))
        // map result and invoke another action
      )
    )
  );

  @Effect()
  updateProduct$ = this.actions$.pipe(
    ofType(productActions.ProductActionTypes.UpdateProduct),
    map((action: productActions.UpdateProduct) => action.payload),
    mergeMap((product: Product) =>
      this.productService.updateProduct(product).pipe(
        map(
          (updatedProduct) =>
            new productActions.UpdateProductSuccess(updatedProduct)
        ),
        catchError((err) => of(new productActions.UpdateProductFail(err)))
      )
    )
  );

  @Effect()
  createProduct$ = this.actions$.pipe(
    ofType(productActions.ProductActionTypes.CreateProduct),
    map((action: productActions.CreateProduct) => action.payload),
    mergeMap((product: Product) =>
      this.productService.createProduct(product).pipe(
        map(
          (newProduct) => new productActions.CreateProductSuccess(newProduct)
        ),
        catchError((err) => of(new productActions.CreateProductFail(err)))
      )
    )
  );

  @Effect()
  deleteProduct$ = this.actions$.pipe(
    ofType(productActions.ProductActionTypes.DeleteProduct),
    map((action: productActions.DeleteProduct) => action.payload),
    mergeMap((productId: number) =>
      this.productService.deleteProduct(productId).pipe(
        map(() => new productActions.DeleteProductSuccess(productId)),
        catchError((err) => of(new productActions.DeleteProductFail(err)))
      )
    )
  );
}
