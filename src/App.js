import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item
  removeCartItem = productId => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(
        cartItem => cartItem.id !== productId,
      ),
    }))
  }

  incrementCartItemQuantity = (cartItemId, newQuantity) => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(cartItem => {
        console.log(cartItem)
        if (cartItem.id === cartItemId) {
          return {...cartItem, quantity: newQuantity}
        }
        return cartItem
      }),
    }))
  }

  decrementCartItemQuantity = (cartItemId, newQuantity) => {
    if (newQuantity === 0) {
      this.removeCartItem(cartItemId)
    } else {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(cartItem => {
          if (cartItemId === cartItem.id) {
            return {...cartItem, quantity: newQuantity}
          }
          return cartItem
        }),
      }))
    }
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  addCartItem = product => {
    const {cartList} = this.state
    //   TODO: Update the code here to implement addCartItem
    const productObj = cartList.find(cartItem => cartItem.id === product.id)
    console.log(productObj)
    if (productObj) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(cartItem => {
          if (cartItem.id === product.id) {
            return {...cartItem, quantity: cartItem.quantity + product.quantity}
          }
          return cartItem
        }),
      }))
    } else {
      this.setState(prevState => ({
        cartList: [...prevState.cartList, product],
      }))
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
