import PropTypes from "prop-types";
import { useState, useEffect } from "react";

export default function CouponInterface(props) {
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    let purchaseSubtotal = 0;

    props.products.map((product) => {
      purchaseSubtotal += product.price * product.quantity;
    });

    setSubtotal(purchaseSubtotal);
  }, [props.products]);

  return props.couponInterface ? (
    <div className="couponInterfaceContainer">
      <div className="couponInterface">
        <button className="closeCoupons" onClick={props.handleCouponInterface}>
          X
        </button>

        {props.coupons.length === 0 ? (
          <div className="couponPlaceholder">
            <h3>Nenhum cupom disponível.</h3>
          </div>
        ) : (
          <div className="couponList">
            <h3>Selecione um cupom para aplicar: </h3>
            <h4>(Cada cupom pode ser utilizado apenas uma vez.)</h4>
            {props.coupons.map((coupon, index) => {
              return (
                <div
                  key={index}
                  className="coupon"
                  onClick={() => props.applyCoupon(index, subtotal)}
                >
                  <h3>{coupon.name}</h3>
                  <p>{coupon.discountValue}% de desconto</p>
                  {coupon.minPurchaseValue ? (
                    <span>
                      Cupom válido apenas para compras acima de R$
                      {coupon.minPurchaseValue}
                    </span>
                  ) : null}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  ) : null;
}

CouponInterface.propTypes = {
  coupons: PropTypes.array,
  applyCoupon: PropTypes.func,
  couponInterface: PropTypes.bool,
  handleCouponInterface: PropTypes.func,
  products: PropTypes.array,
};
