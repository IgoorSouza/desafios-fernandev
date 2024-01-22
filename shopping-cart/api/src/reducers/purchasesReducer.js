export default function purchasesReducer(state = [], action) {
  switch (action.type) {
    case "updatePurchases":
      return action.payload
  
    default:
      return state
  }
}