export default function purchasesReducer(state = [], action) {
  switch (action.type) {
    case "updatePurchases":
      return [...state, action.payload]
  
    default:
      return state
  }
}