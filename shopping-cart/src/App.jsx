import { useEffect, useState } from "react";
import ProductList from "./components/ProductList";
import Summary from "./components/Summary";
import PurchasesInterface from "./components/PurchasesInterface";
import CouponInterface from "./components/CouponInterface";

function App() {
  const [products, setProducts] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [purchasesInterface, setPurchasesInterface] = useState(false);
  const [couponInterface, setCouponInterface] = useState(false);
  const [currentCoupon, setCurrentCoupon] = useState({});
  const [coupons, setCoupons] = useState([
    { name: "cupom123", discountValue: 10 },
    { name: "desconto15", discountValue: 15 },
    { name: "shopping", discountValue: 30, minPurchaseValue: 1000 },
  ]);

  function addItem() {
    let newProduct = {
      name: `Produto ${products.length + 1}`,
      price: (Math.random() * 1000).toFixed(2),
      quantity: 1,
    };

    setProducts([...products, newProduct]);
  }

  function removeItem(itemIndex) {
    let newProducts = [...products];
    newProducts.splice(itemIndex, 1);

    setProducts(newProducts);
  }

  function handleQuantity(index, action) {
    let newProducts = [...products];
    if (action === "take") {
      newProducts[index].quantity -= 1;
    } else {
      newProducts[index].quantity += 1;
    }
    setProducts(newProducts);
  }

  function finalizePurchase(total) {
    let newPurchase = {
      products,
      value: total,
    };

    if (currentCoupon.name) {
      newPurchase.coupon = currentCoupon;

      let newCoupons = [...coupons];
      newCoupons.splice(coupons.indexOf(currentCoupon), 1);

      setCoupons(newCoupons);
      setCurrentCoupon({});
    }

    setPurchases([...purchases, newPurchase]);
    setProducts([]);

    window.alert("Compra finalizada.");
  }

  function handlePurchasesInterface() {
    setPurchasesInterface((state) => !state);
  }

  function handleCouponInterface() {
    setCouponInterface((state) => !state);
  }

  function applyCoupon(couponIndex, subtotal) {
    if (
      (coupons[couponIndex].minPurchaseValue &&
        subtotal >= coupons[couponIndex].minPurchaseValue) ||
      !coupons[couponIndex].minPurchaseValue
    ) {
      setCurrentCoupon(coupons[couponIndex]);
      handleCouponInterface();
    }
  }

  return (
    <>
      <PurchasesInterface
        handlePurchasesInterface={handlePurchasesInterface}
        purchasesInterface={purchasesInterface}
        purchases={purchases}
      />

      <CouponInterface
        coupons={coupons}
        applyCoupon={applyCoupon}
        handleCouponInterface={handleCouponInterface}
        couponInterface={couponInterface}
        products={products}
      />

      <div className="top-bar" />

      <div className="container">
        <h1>Seu carrinho</h1>

        <button onClick={addItem}>Adicionar ao carrinho</button>

        <button onClick={handlePurchasesInterface}>
          Ver compras realizadas
        </button>

        <div className="cart">
          {products.length > 0 ? (
            <table className="products">
              <thead>
                <tr>
                  <th>
                    <h3>PRODUTO</h3>
                  </th>

                  <th>
                    <h3>PREÇO</h3>
                  </th>
                  <th>
                    <h3>QUANTIDADE</h3>
                  </th>

                  <th>
                    <h3>TOTAL</h3>
                  </th>

                  <th></th>
                </tr>
              </thead>

              <ProductList
                products={products}
                removeItem={removeItem}
                handleQuantity={handleQuantity}
              />
            </table>
          ) : (
            <div colSpan="5" className="placeholder">
              <h3>Seu carrinho está vazio.</h3>
            </div>
          )}

          <Summary
            products={products}
            handleCouponInterface={handleCouponInterface}
            finalizePurchase={finalizePurchase}
            currentCoupon={currentCoupon}
          />
        </div>
      </div>
    </>
  );
}

export default App;
