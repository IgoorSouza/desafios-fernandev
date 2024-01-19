export default function purchasesInterfaceReducer(state = false, action) {
  switch (action.type) {
    case "togglePurchasesInterface":
      return !state
  
    default:
      return state
  }
}