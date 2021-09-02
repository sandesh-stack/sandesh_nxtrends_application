// Write your code here
import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let total = 0
      const renderCartTotal = () => {
        cartList.forEach(cartItem => {
          total += cartItem.price * cartItem.quantity
        })
        return total
      }
      return (
        <>
          <div className="cart-summary-content-container">
            <h1 className="total-and-cart-items order-total">
              Order Total:
              <span className="total-price"> Rs {renderCartTotal()}/-</span>
            </h1>
            <p className="total-and-cart-items cart-items">
              {cartList.length} Items in cart
            </p>
            <button
              type="button"
              className="checkout-button desktop-checkout-button"
            >
              Checkout
            </button>
          </div>
          <button
            type="button"
            className="checkout-button mobile-checkout-button"
          >
            Checkout
          </button>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
