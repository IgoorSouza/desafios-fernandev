let coupons = [
  { name: "cupom123", discountValue: 10 },
  { name: "desconto15", discountValue: 15 },
  { name: "shopping", discountValue: 30, minPurchaseValue: 1000 },
];

export default function couponsReducer(state = coupons, action) {
  switch (action.type) {
    case "removeCoupon":
      return action.payload
  
    default:
      return state;
  }
}