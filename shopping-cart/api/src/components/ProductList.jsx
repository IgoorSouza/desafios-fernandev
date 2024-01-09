import PropTypes from "prop-types";
import { Fragment } from "react";

export default function ProductList({ products, removeItem, handleQuantity }) {
  return (
    <tbody>
      {products.map((product) => {
        return (
          <Fragment key={product._id}>
            <tr>
              <td>
                <div className="productName">
                  <h3>{product.name}</h3>
                  <p>{product.category}</p>
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

                  <button onClick={() => handleQuantity(product, "increase")}>
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
                  onClick={() => removeItem(product._id)}
                >
                  x
                </button>
              </td>
            </tr>
          </Fragment>
        );
      })}
    </tbody>
  );
}

ProductList.propTypes = {
  products: PropTypes.array,
  removeItem: PropTypes.func,
  handleQuantity: PropTypes.func,
};
