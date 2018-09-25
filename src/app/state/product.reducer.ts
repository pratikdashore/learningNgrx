export function productReducer(state, action) {
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
