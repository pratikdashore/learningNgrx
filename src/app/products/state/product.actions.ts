import { Action, createAction, props } from '@ngrx/store';
import { Product } from '../product';

export const setCurrentProduct = createAction(
  '[Product] Set Current Product',
  props<{ product: Product }>()
);

export const initializeCurrentProduct = createAction(
  '[Product] Initialize Current Product'
);

export const clearCurrentProduct = createAction(
  '[Product] Clear Current Product'
);

export const loadProducts = createAction('[Product] Load products');

export const loadProductsSuccess = createAction(
  '[Product] Load Product Success',
  props<{ products: Product[] }>()
);

export const loadProductsFail = createAction(
  '[Product] Load Product Fail',
  props<{ message: string }>()
);

export const updateProduct = createAction(
  '[Product] Update Product',
  props<{ product: Product }>()
);

export const updateProductSuccess = createAction(
  '[Product] Update Product Success',
  props<{ product: Product }>()
);

export const updateProductFail = createAction(
  '[Product] Update Product Fail',
  props<{ message: string }>()
);

export const createProduct = createAction(
  '[Product] Create Product',
  props<{ product: Product }>()
);

export const createProductSuccess = createAction(
  '[Product] Create Product Success',
  props<{ product: Product }>()
);

export const createProductFail = createAction(
  '[Product] Create Product Fail',
  props<{ message: string }>()
);

export const deleteProduct = createAction(
  '[Product] Delete Product',
  props<{ productId: number }>()
);

export const deleteProductSuccess = createAction(
  '[Product] Delete Product Success',
  props<{ productId: number }>()
);

export const deleteProductFail = createAction(
  '[Product] Delete Product Fail',
  props<{ message: string }>()
);
