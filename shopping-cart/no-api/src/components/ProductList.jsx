import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function ProductList() {
  const products = useSelector((state) => {
    return state.allReducers.productsReducer;
  });

  const dispatch = useDispatch();

  function addProduct() {
    let newProduct = {
      name: `Produto ${products.length + 1}`,
      price: (Math.random() * 1000).toFixed(2),
      quantity: 1,
    };

    dispatch({ type: "addProduct", payload: newProduct });
  }

  function removeProduct(productToRemove) {
    const newProducts = products.filter((product, index) => {
      return index !== productToRemove;
    });

    dispatch({ type: "removeProduct", payload: newProducts });
  }

  function handleQuantity(product, action) {
    let newProduct = { ...product };

    if (action === "increase") {
      newProduct.quantity += 1;
    } else {
      newProduct.quantity -= 1;
    }

    const newProducts = [...products];
    newProducts[products.indexOf(product)] = newProduct;

    dispatch({ type: "changeProductQuantity", payload: newProducts });
  }

  return products.length > 0 ? (
    <div>
      <button onClick={addProduct}>Adicionar ao carrinho</button>
      <button
        onClick={() => {
          dispatch({ type: "togglePurchasesInterface" });
        }}
      >
        Ver compras realizadas
      </button>
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
            <th />
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => {
            return (
              <Fragment key={index}>
                <tr>
                  <td>
                    <div className="productName">
                      <h3>{product.name}</h3>
                      <p>categoria</p>
                    </div>
                  </td>
                  <td>
                    <h3>R$ {product.price}</h3>
                  </td>
                  <td>
                    <div className="productQuantity">
                      <button
                        disabled={product.quantity === 1}
                        onClick={() => handleQuantity(product, "decrease")}
                      >
                        -
                      </button>
                      <h3>{product.quantity}</h3>
                      <button
                        onClick={() => handleQuantity(product, "increase")}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>
                    <h3>R$ {(product.price * product.quantity).toFixed(2)}</h3>
                  </td>
                  <td>
                    <button
                      className="removeButton"
                      onClick={() => removeProduct(index)}
                    >
                      x
                    </button>
                  </td>
                </tr>
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  ) : (
    <div className="placeholder">
      <button onClick={addProduct}>Adicionar ao carrinho</button>
      <button
        onClick={() => {
          dispatch({ type: "togglePurchasesInterface" });
        }}
      >
        Ver compras realizadas
      </button>
      <h3>Seu carrinho está vazio.</h3>
    </div>
  );
}
