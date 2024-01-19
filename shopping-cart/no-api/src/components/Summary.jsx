import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function Summary() {
  const products = useSelector((state) => {
    return state.allReducers.productsReducer;
  });

  const coupons = useSelector((state) => {
    return state.allReducers.couponsReducer;
  });

  const currentCoupon = useSelector((state) => {
    return state.allReducers.currentCouponReducer;
  });

  const subtotal = useSelector((state) => {
    return state.allReducers.purchaseSubtotalReducer;
  });

  const [total, setTotal] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    let purchaseValue = 0;

    products.map((product) => {
      purchaseValue += product.price * product.quantity;
    });

    dispatch({
      type: "updateSubtotal",
      payload: parseFloat(purchaseValue.toFixed(2)),
    });

    if (currentCoupon != null) {
      purchaseValue =
        purchaseValue - (purchaseValue / 100) * currentCoupon.discountValue;

      setTotal(parseFloat(purchaseValue.toFixed(2)));
    }
  }, [products, currentCoupon]);

  function finalizePurchase() {
    let newPurchase = {
      products,
      value: total != 0 ? total : subtotal,
    };

    if (currentCoupon != null) {
      newPurchase.coupon = currentCoupon;

      let newCoupons = [...coupons];
      newCoupons.splice(coupons.indexOf(currentCoupon), 1);

      dispatch({ type: "removeCoupon", payload: newCoupons });
      dispatch({ type: "clearCurrentCoupon" });
    }

    dispatch({ type: "updatePurchases", payload: newPurchase });
    dispatch({ type: "clearProducts" });
    window.alert("Compra finalizada.");
  }

  function toggleCouponsInterface() {
    dispatch({ type: "toggleCouponsInterface" });
  }

  return (
    <div className="summary">
      <div className="summaryInfo">
        <div className="summaryTitle">
          <h3>Resumo da compra</h3>
        </div>

        <div className="resume">
          <div className="subtotal">
            <span>Sub-total</span>
            <span>R$ {subtotal}</span>
          </div>

          <div>
            <div className="freight">
              <span>Frete</span>
              <span>Gratuito</span>
            </div>

            <span className="discountCoupon" onClick={toggleCouponsInterface}>
              {currentCoupon != null
                ? `Cupom aplicado: ${currentCoupon.name}`
                : "Adicionar cupom de desconto"}
            </span>
          </div>
        </div>

        <div className="total">
          <span>Total</span>
          <span>R$ {currentCoupon != null ? total : subtotal}</span>
        </div>
      </div>

      <button disabled={products.length === 0} onClick={finalizePurchase}>
        FINALIZAR COMPRA
      </button>
    </div>
  );
}
