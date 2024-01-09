import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function Summary(props) {
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let purchaseValue = 0;
    props.products.map((item) => {
      purchaseValue += item.price * item.quantity;
    });

    setSubtotal(parseFloat(purchaseValue.toFixed(2)));

    if (props.currentCoupon.name) {
      purchaseValue =
        purchaseValue -
        (purchaseValue / 100) * props.currentCoupon.discountValue;

      setTotal(parseFloat(purchaseValue.toFixed(2)));
    }
  }, [props.products, props.currentCoupon]);

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

            <span
              className="discountCoupon"
              onClick={props.handleCouponInterface}
            >
              {props.currentCoupon.name
                ? `Cupom aplicado: ${props.currentCoupon.name}`
                : "Adicionar cupom de desconto"}
            </span>
          </div>
        </div>

        <div className="total">
          <span>Total</span>
          <span>R$ {props.currentCoupon.name ? total : subtotal}</span>
        </div>
      </div>

      <button
        disabled={props.products.length === 0}
        onClick={() => {
          props.finalizePurchase(props.currentCoupon.name ? total : subtotal);
        }}
      >
        FINALIZAR COMPRA
      </button>
    </div>
  );
}

Summary.propTypes = {
  products: PropTypes.array,
  handleCouponInterface: PropTypes.func,
  finalizePurchase: PropTypes.func,
  currentCoupon: PropTypes.object,
};
