import { api } from "../provider";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function PurchasesInterface() {
  const purchases = useSelector((state) => {
    return state.allReducers.purchasesReducer;
  });

  const purchasesInterface = useSelector((state) => {
    return state.allReducers.purchasesInterfaceReducer;
  });

  const [purchaseDetails, setPurchaseDetails] = useState(null);

  const dispatch = useDispatch();

  function fetchPurchases() {
    api.get("/purchases").then((res) => {
      dispatch({ type: "updatePurchases", payload: res.data });
    });
  }

  function seePurchase(purchase) {
    setPurchaseDetails(purchase);
  }

  useEffect(() => {
    fetchPurchases();
  }, []);

  return purchasesInterface ? (
    <div className="purchasesInterfaceContainer">
      <div className="purchasesInterface">
        <button
          className="closePurchases"
          onClick={() => {
            dispatch({ type: "togglePurchasesInterface" });
            setPurchaseDetails(null);
          }}
        >
          X
        </button>

        {purchases.length > 0 ? (
          purchaseDetails ? (
            <div className="purchaseDetails">
              <button
                onClick={() => {
                  setPurchaseDetails(null);
                }}
              >
                Voltar
              </button>

              <h2>Compra {purchases.indexOf(purchaseDetails) + 1}</h2>

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
            purchases.map((purchase, index) => {
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
