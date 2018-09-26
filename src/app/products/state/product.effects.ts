import { ProductService } from "./../product.service";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import * as productActions from "./product.actions";
import { mergeMap, map } from "rxjs/operators";
import { Product } from "../product";

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
        ) // map result and invoke another action
      )
    )
  );
}
