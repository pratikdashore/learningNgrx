import * as fromRoot from "./../../state/app.state";
import { Product } from "./../product";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductActions, ProductActionTypes } from "./product.actions";

export interface State extends fromRoot.State {
  products: ProductState;
}

export interface ProductState {
  showProductCode: boolean;
  currentProduct: Product;
  products: Product[];
  currentProductId: number;
}

const initialState: ProductState = {
  showProductCode: true,
  currentProduct: null,
  currentProductId: -1,
  products: []
};

const getProductFeatureState = createFeatureSelector<ProductState>("products");

export const getShowProductCode = createSelector(
  getProductFeatureState,
  state => state.showProductCode
);

export const getCurrentProductId = createSelector(
  getProductFeatureState,
  state => state.currentProductId
);

export const getCurrentProduct = createSelector(
  getProductFeatureState,
  getCurrentProductId,
  (state, id) => state.products.find(product => product.id === id)
);

export const getProducts = createSelector(
  getProductFeatureState,
  state => state.products
);

export function productReducer(
  state = initialState,
  action: ProductActions
): ProductState {
  switch (action.type) {
    case ProductActionTypes.ToggleProductCode:
      return {
        ...state,
        showProductCode: action.payload
      };
    case ProductActionTypes.ClearCurrentProduct:
      return {
        ...state,
        currentProduct: null
      };

    case ProductActionTypes.SetCurrentProduct:
      return {
        ...state,
        currentProduct: { ...action.payload }
      };

    case ProductActionTypes.InitializeCurrentProduct:
      return {
        ...state,
        currentProduct: {
          id: -1,
          productName: "",
          productCode: "New",
          description: "",
          starRating: 0
        }
      };
    default:
      return state;
  }
}
