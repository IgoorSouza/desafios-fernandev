import { useEffect, useState } from "react";
import { api } from "./provider";
import ProductList from "./components/ProductList";
import Summary from "./components/Summary";
import CouponInterface from "./components/CouponInterface";
import PurchasesInterface from "./components/PurchasesInterface";

function randomNumber(min, max) {
  return (Math.random() * (max - min) + min).toFixed(2);
}

function App() {
  const [products, setProducts] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [currentCoupon, setCurrentCoupon] = useState({});
  const [purchasesInterface, setPurchasesInterface] = useState(false);
  const [couponInterface, setCouponInterface] = useState(false);

  const productObject = {
    name: "produto",
    category: "categoria",
    price: parseFloat(randomNumber(90, 1200)),
    quantity: 1,
  };

  function fetchData() {
    api.get("/cart").then((res) => setProducts(res.data));
    api.get("/purchases").then((res) => setPurchases(res.data));
    api.get("coupons").then((res) => setCoupons(res.data));
  }

  useEffect(() => {
    fetchData();
  }, []);

  function addItem() {
    api.post("/cart", productObject).then(() => fetchData());
  }

  function removeItem(productId) {
    api.delete(`/cart/${productId}`).then(() => fetchData());
  }

  function handleQuantity(product, action) {
    let newQuantity = product.quantity;

    if (action === "increase") {
      newQuantity += 1;
    } else {
      newQuantity -= 1;
    }

    const newProduct = { ...product, quantity: newQuantity };
    delete newProduct._id;

    api.put(`cart/${product._id}`, newProduct).then(() => fetchData());
  }

  function finalizePurchase(total) {
    let newPurchase = {
      products,
      value: total,
    };

    if (currentCoupon.name) {
      newPurchase.coupon = currentCoupon;

      const newCoupon = { ...currentCoupon, available: false };
      delete newCoupon._id;

      api.put(`/coupons/${currentCoupon._id}`, newCoupon);

      setCurrentCoupon({});
    }

    api
      .post("/purchases", newPurchase)
      .then(
        products.map((product) => {
          api.delete(`/cart/${product._id}`);
        })
      )
      .then(() => fetchData());

    window.alert("Compra finalizada.");
  }

  function handlePurchasesInterface() {
    setPurchasesInterface((state) => !state);
  }

  function handleCouponInterface() {
    setCouponInterface((state) => !state);
  }

  function applyCoupon(coupon, subtotal) {
    if (
      (coupon.minPurchaseValue && subtotal >= coupon.minPurchaseValue) ||
      !coupon.minPurchaseValue
    ) {
      setCurrentCoupon(coupon);
      handleCouponInterface();
    }
  }

  return (
    <>
      <PurchasesInterface
        purchases={purchases}
        purchasesInterface={purchasesInterface}
        handlePurchasesInterface={handlePurchasesInterface}
      />

      <CouponInterface
        products={products}
        coupons={coupons}
        couponInterface={couponInterface}
        applyCoupon={applyCoupon}
        handleCouponInterface={handleCouponInterface}
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
            <div className="placeholder">
              <h3>Seu carrinho está vazio.</h3>
            </div>
          )}

          <Summary
            products={products}
            currentCoupon={currentCoupon}
            finalizePurchase={finalizePurchase}
            handleCouponInterface={handleCouponInterface}
          />
        </div>
      </div>
    </>
  );
}

export default App;
