export default function couponsReducer(state = [], action) {
  switch (action.type) {
    case "updateCoupons":
      return action.payload
  
    default:
      return state;
  }
}