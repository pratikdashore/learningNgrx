import * as fromRoot from "./../../state/app.state";
import { Product } from "./../product";
import { createFeatureSelector, createSelector } from "@ngrx/store";

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

export function productReducer(state = initialState, action): ProductState {
  switch (action.type) {
    case "TOGGLE_PRODUCT_CODE":
      console.log("Toggle product code reducer");
      console.log("Existing state:", state);
      console.log("action:", action);
      return {
        ...state,
        showProductCode: action.payload
      };

    default:
      return state;
  }
}
