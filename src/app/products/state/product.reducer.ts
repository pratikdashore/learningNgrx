import * as fromRoot from "./../../state/app.state";
import { Product } from "./../product";

export interface State extends fromRoot.State {
  products: ProductState;
}

export interface ProductState {
  showProductCode: boolean;
  currentProduct: Product;
  products: Product[];
}

const initialState: ProductState = {
  showProductCode: true,
  currentProduct: null,
  products: []
};

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
