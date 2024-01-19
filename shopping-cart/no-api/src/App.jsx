import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import productsReducer from "./reducers/productsReducer";
import couponsReducer from "./reducers/couponsReducer";
import currentCouponReducer from "./reducers/currentCouponReducer";
import couponsInterfaceReducer from "./reducers/couponsInterfaceReducer";
import purchasesReducer from "./reducers/purchasesReducer";
import purchaseSubtotalReducer from "./reducers/purchaseSubtotalReducer";
import purchasesInterfaceReducer from "./reducers/purchasesInterfaceReducer";

import ProductList from "./components/ProductList";
import Summary from "./components/Summary";
import CouponInterface from "./components/CouponInterface";
import PurchasesInterface from "./components/PurchasesInterface";

const allReducers = combineReducers({
  productsReducer,
  couponsReducer,
  currentCouponReducer,
  couponsInterfaceReducer,
  purchasesReducer,
  purchaseSubtotalReducer,
  purchasesInterfaceReducer,
});
const store = configureStore({ reducer: { allReducers } });

function App() {
  return (
    <>
      <Provider store={store}>
        <PurchasesInterface />

        <CouponInterface />

        <div className="top-bar" />
        <div className="container">
          <h1>Seu carrinho</h1>
          <div className="cart">
            <ProductList />

            <Summary />
          </div>
        </div>
      </Provider>
    </>
  );
}

export default App;
