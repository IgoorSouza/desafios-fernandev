import PropTypes from "prop-types";

export default function ProductList(props) {
  return (
    <tbody>
      {props.products.map((product, index) => {
        return (
          <>
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
                    onClick={() => props.handleQuantity(index, "take")}
                  >
                    -
                  </button>
                  <h3>{product.quantity}</h3>
                  <button onClick={() => props.handleQuantity(index, "add")}>
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
                  onClick={() => props.removeItem(index)}
                >
                  x
                </button>
              </td>
            </tr>
          </>
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
