import { Action } from "@ngrx/store";
import { Product } from "../product";

export enum ProductActionTypes {
  ToggleProductCode = "[Product] Toggle Product Code",
  SetCurrentProduct = "[Product] Set Current Product",
  ClearCurrentProduct = "[Product] Clear Current Product",
  InitializeCurrentProduct = "[Product] Initialize Current Product",

  LoadProducts = "[Product] Load products",
  LoadProductsSuccess = "[Product] Load Product Success",
  LoadProductsFail = "[Product] Load Product Fail"
}

export class ToggleProductCode implements Action {
  readonly type = ProductActionTypes.ToggleProductCode;
  constructor(public payload: boolean) {}
}

export class SetCurrentProduct implements Action {
  readonly type = ProductActionTypes.SetCurrentProduct;
  constructor(public payload: Product) {}
}

export class InitializeCurrentProduct implements Action {
  readonly type = ProductActionTypes.InitializeCurrentProduct;
}

export class ClearCurrentProduct implements Action {
  readonly type = ProductActionTypes.ClearCurrentProduct;
}

export class LoadProducts implements Action {
  readonly type = ProductActionTypes.LoadProducts;
}

export class LoadProductsSuccess implements Action {
  readonly type = ProductActionTypes.LoadProductsSuccess;
  constructor(public payload: Product[]) {}
}

export class LoadProductsFail implements Action {
  readonly type = ProductActionTypes.LoadProductsFail;
  constructor(public payload: string) {}
}

export type ProductActions =
  | ToggleProductCode
  | SetCurrentProduct
  | InitializeCurrentProduct
  | ClearCurrentProduct
  | LoadProducts
  | LoadProductsSuccess
  | LoadProductsFail;
