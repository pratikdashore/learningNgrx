import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import {
  catchError,
  concatMap,
  exhaustMap,
  map,
  mergeMap,
} from 'rxjs/operators';
import { Product } from '../product';
import { ProductService } from './../product.service';
import * as productActions from './product.actions';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}

  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(productActions.loadProducts),
      exhaustMap(() =>
        this.productService.getProducts().pipe(
          map((products: Product[]) =>
            productActions.loadProductsSuccess({ products })
          ),
          catchError((error) =>
            of(productActions.loadProductsFail({ message: error }))
          )
        )
      )
    );
  });

  updateProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(productActions.updateProduct),
      concatMap((action) =>
        this.productService.updateProduct(action.product).pipe(
          map((updatedProduct) =>
            productActions.updateProductSuccess({ product: updatedProduct })
          ),
          catchError((err) =>
            of(productActions.updateProductFail({ message: err }))
          )
        )
      )
    );
  });

  createProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(productActions.createProduct),
      mergeMap((action) =>
        this.productService.createProduct(action.product).pipe(
          map((newProduct) =>
            productActions.createProductSuccess({ product: newProduct })
          ),
          catchError((err) =>
            of(productActions.createProductFail({ message: err }))
          )
        )
      )
    );
  });

  deleteProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(productActions.deleteProduct),
      mergeMap((action) =>
        this.productService.deleteProduct(action.productId).pipe(
          map(() =>
            productActions.deleteProductSuccess({ productId: action.productId })
          ),
          catchError((err) =>
            of(productActions.deleteProductFail({ message: err }))
          )
        )
      )
    );
  });
}
