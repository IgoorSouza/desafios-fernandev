export default function productsReducer(state = [], action) {
  switch (action.type) {
    case "updateProducts":
      return action.payload;

    default:
      return state;
  }
}
