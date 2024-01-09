import { useState } from "react";
import PropTypes from "prop-types";

export default function PurchasesInterface(props) {
  const [purchaseDetails, setPurchaseDetails] = useState(null);

  function seePurchase(purchase) {
    setPurchaseDetails(purchase);
  }

  return props.purchasesInterface ? (
    <div className="purchasesInterfaceContainer">
      <div className="purchasesInterface">
        <button
          className="closePurchases"
          onClick={() => {
            props.handlePurchasesInterface();
            setPurchaseDetails(null);
          }}
        >
          X
        </button>

        {props.purchases.length > 0 ? (
          purchaseDetails ? (
            <div className="purchaseDetails">
              <button
                onClick={() => {
                  setPurchaseDetails(null);
                }}
              >
                Voltar
              </button>

              <h2>Compra {props.purchases.indexOf(purchaseDetails) + 1}</h2>

              <h3>Valor Total: R$ {purchaseDetails.value}</h3>

              {purchaseDetails.coupon ? (
                <h3>Cupom utilizado: {purchaseDetails.coupon.name}</h3>
              ) : null}

              {purchaseDetails.products.map((product, index) => {
                return (
                  <div key={index}>
                    <p>Nome: {product.name}</p>
                    <p>Preço: R$ {product.price}</p>
                    <p>Quantidade: {product.quantity}</p>
                  </div>
                );
              })}
            </div>
          ) : (
            props.purchases.map((purchase, index) => {
              return (
                <div
                  key={index}
                  className="purchase"
                  onClick={() => seePurchase(purchase)}
                >
                  <h3>Compra {index + 1}</h3>
                  <p>R$ {purchase.value}</p>
                  {purchase.coupon ? (
                    <p>Cupom utilizado: {purchase.coupon.name}</p>
                  ) : null}
                </div>
              );
            })
          )
        ) : (
          <div className="purchasesPlaceholder">
            <h3>Nenhuma compra realizada.</h3>
          </div>
        )}
      </div>
    </div>
  ) : null;
}

PurchasesInterface.propTypes = {
  handlePurchasesInterface: PropTypes.func,
  purchasesInterface: PropTypes.bool,
  purchases: PropTypes.array,
};
