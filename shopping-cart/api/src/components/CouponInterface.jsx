import PropTypes from "prop-types";
import { useState, useEffect } from "react";

export default function CouponInterface({
  products,
  coupons,
  couponInterface,
  applyCoupon,
  handleCouponInterface,
}) {
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    let purchaseSubtotal = 0;

    products.map((product) => {
      purchaseSubtotal += product.price * product.quantity;
    });

    setSubtotal(purchaseSubtotal);
  }, [products]);

  return couponInterface ? (
    <div className="couponInterfaceContainer">
      <div className="couponInterface">
        <button className="closeCoupons" onClick={handleCouponInterface}>
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
            {coupons.map((coupon) => {
              if (coupon.available) {
                return (
                  <div
                    key={coupon._id}
                    className="coupon"
                    onClick={() => applyCoupon(coupon, subtotal)}
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
              }
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
