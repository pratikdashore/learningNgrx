import * as fromRoot from './../../state/app.state';
import { Product } from './../product';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductActions, ProductActionTypes } from './product.actions';

export interface State extends fromRoot.State {
  products: ProductState;
}

export interface ProductState {
  showProductCode: boolean;
  products: Product[];
  currentProductId: number;
  error: string;
}

const initialState: ProductState = {
  showProductCode: true,
  currentProductId: null,
  products: [],
  error: '',
};

const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
  getProductFeatureState,
  (state) => state.showProductCode
);

export const getCurrentProductId = createSelector(
  getProductFeatureState,
  (state) => state.currentProductId
);

export const getCurrentProduct = createSelector(
  getProductFeatureState,
  getCurrentProductId,
  (state, id) => {
    if (id === 0) {
      return {
        id: 0,
        productName: '',
        productCode: 'New',
        description: '',
        starRating: 0,
      };
    } else {
      return id ? state.products.find((product) => product.id === id) : null;
    }
  }
);

export const getProducts = createSelector(
  getProductFeatureState,
  (state) => state.products
);

export const getError = createSelector(
  getProductFeatureState,
  (state) => state.error
);

export function productReducer(
  state = initialState,
  action: ProductActions
): ProductState {
  switch (action.type) {
    case ProductActionTypes.ToggleProductCode:
      return {
        ...state,
        showProductCode: action.payload,
      };
    case ProductActionTypes.ClearCurrentProduct:
      return {
        ...state,
        currentProductId: null,
      };

    case ProductActionTypes.SetCurrentProduct:
      return {
        ...state,
        currentProductId: action.payload.id,
      };

    case ProductActionTypes.LoadProductsSuccess:
      return {
        ...state,
        products: action.payload,
        error: '',
      };

    case ProductActionTypes.LoadProductsFail:
      return {
        ...state,
        products: [],
        error: action.payload,
      };

    case ProductActionTypes.InitializeCurrentProduct:
      return {
        ...state,
        currentProductId: 0,
      };

    case ProductActionTypes.UpdateProductSuccess:
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        ),
        currentProductId: action.payload.id,
        error: '',
      };

    case ProductActionTypes.CreateProductFail:
    case ProductActionTypes.UpdateProductFail:
      return {
        ...state,
        currentProductId: null,
        error: action.payload,
      };

    case ProductActionTypes.DeleteProductSuccess:
      return {
        ...state,
        currentProductId: null,
        error: '',
        products: state.products.filter(
          (product) => product.id !== action.payload
        ),
      };

    case ProductActionTypes.DeleteProductFail:
      return {
        ...state,
        error: action.payload,
      };
    case ProductActionTypes.CreateProductSuccess:
      return {
        ...state,
        currentProductId: null,
        error: '',
        products: [...state.products, action.payload],
      };
    default:
      return state;
  }
}
