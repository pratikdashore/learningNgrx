import * as fromRoot from './../../state/app.state';
import { Product } from './../product';
import {
  createFeatureSelector,
  createSelector,
  createReducer,
  on,
} from '@ngrx/store';
import * as ProductActions from './product.actions';

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

const productReducer = createReducer(
  initialState,
  on(ProductActions.toggleProductCode, (state, action) => ({
    ...state,
    showProductCode: action.showCode,
  })),

  on(ProductActions.clearCurrentProduct, (state, action) => ({
    ...state,
    currentProductId: null,
  })),

  on(ProductActions.setCurrentProduct, (state, action) => ({
    ...state,
    currentProductId: action.product.id,
  })),

  on(ProductActions.loadProductsSuccess, (state, action) => ({
    ...state,
    products: action.products,
    error: '',
  })),

  on(
    ProductActions.loadProductsFail,
    ProductActions.deleteProductFail,
    (state, action) => ({
      ...state,
      error: action.message,
    })
  ),

  on(ProductActions.initializeCurrentProduct, (state, action) => ({
    ...state,
    currentProductId: 0,
  })),

  on(ProductActions.updateProductSuccess, (state, action) => ({
    ...state,
    products: state.products.map((product) =>
      product.id === action.product.id ? action.product : product
    ),
    currentProductId: action.product.id,
    error: '',
  })),

  on(
    ProductActions.createProductFail,
    ProductActions.updateProductFail,
    (state, action) => ({
      ...state,
      currentProductId: null,
      error: action.message,
    })
  ),

  on(ProductActions.deleteProductSuccess, (state, action) => ({
    ...state,
    currentProductId: null,
    error: '',
    products: state.products.filter(
      (product) => product.id !== action.productId
    ),
  })),

  on(ProductActions.createProductSuccess, (state, action) => ({
    ...state,
    currentProductId: null,
    error: '',
    products: [...state.products, action.product],
  }))
);

export function reducer(state: ProductState | undefined, action) {
  return productReducer(state, action);
}
