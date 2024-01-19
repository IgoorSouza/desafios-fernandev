export default function couponReducer(state = null, action) {
  switch (action.type) {
    case "applyCoupon":
      return action.payload;

    case "clearCurrentCoupon":
      return null;

    default:
      return state;
  }
}
