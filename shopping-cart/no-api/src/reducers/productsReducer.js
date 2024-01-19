export default function productsReducer(state = [], action) {
  switch (action.type) {
    case "addProduct":
      return [...state, action.payload];

    case "removeProduct":
      return action.payload;

    case "changeProductQuantity":
      return action.payload;

    case "clearProducts":
      return [];

    default:
      return state;
  }
}
