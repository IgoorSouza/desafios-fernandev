export default function couponsInterfaceReducer(state = false, action) {
  switch (action.type) {
    case "toggleCouponsInterface":
      return !state;

    default:
      return state;
  }
}