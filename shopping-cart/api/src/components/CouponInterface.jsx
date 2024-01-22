import { api } from "../provider";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function CouponInterface() {
  const coupons = useSelector((state) => {
    return state.allReducers.couponsReducer;
  });

  const couponsInterface = useSelector((state) => {
    return state.allReducers.couponsInterfaceReducer;
  });

  const subtotal = useSelector((state) => {
    return state.allReducers.purchaseSubtotalReducer;
  });

  const dispatch = useDispatch();

  function fetchCoupons() {
    api
      .get("/coupons")
      .then((res) => dispatch({ type: "updateCoupons", payload: res.data }));
  }

  function applyCoupon(coupon) {
    if (!coupon.minPurchaseValue || subtotal >= coupon.minPurchaseValue) {
      dispatch({ type: "applyCoupon", payload: coupon });
      dispatch({ type: "toggleCouponsInterface" });
    }
  }

  useEffect(() => {
    fetchCoupons();
  }, []);

  useEffect(() => {
    fetchCoupons();
  }, [couponsInterface]);

  return couponsInterface ? (
    <div className="couponInterfaceContainer">
      <div className="couponInterface">
        <button
          className="closeCoupons"
          onClick={() => dispatch({ type: "toggleCouponsInterface" })}
        >
          X
        </button>

        {coupons.length === 0 ? (
          <div className="couponPlaceholder">
            <h3>Nenhum cupom disponível.</h3>
          </div>
        ) : (
          <div className="couponList">
            <h3>Selecione um cupom para aplicar: </h3>
            <h4>(Cada cupom pode ser utilizado apenas uma vez.)</h4>
            {coupons.map((coupon, index) => {
              if (!coupon.used) {
                return (
                  <div
                    key={index}
                    className="coupon"
                    onClick={() => applyCoupon(coupon)}
                  >
                    <h3>{coupon.name}</h3>
                    <p>{coupon.discountValue}% de desconto</p>
                    {coupon.minPurchaseValue ? (
                      <span>
                        Cupom válido apenas para compras acima de R${" "}
                        {coupon.minPurchaseValue}
                      </span>
                    ) : null}
                  </div>
                );
              }
            })}
          </div>
        )}
      </div>
    </div>
  ) : null;
}
