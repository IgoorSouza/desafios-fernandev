export default function purchaseSubTotalReducer(state = 0, action) {
  switch (action.type) {
    case "updateSubtotal":
      return action.payload
  
    default:
      return state
  }
}