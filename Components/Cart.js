import {useState, useEffect} from 'react'
import {Button, Card, Feed, Image} from "semantic-ui-react";
import {client} from "../utils/shopify";
import Router from "next/router";

const Cart = ({product}) => {
    const [cartItems, setCartItems] = useState([])

    useEffect(() => {
        let allCartItems = window.localStorage.getItem('cart')
        if (allCartItems) {
            const cartItemsArray = JSON.parse(allCartItems).lineItems
            setCartItems(cartItemsArray)
        }
    }, [])

    const removeItem = async (event, item) => {
        const storage = window.localStorage
        let checkoutId = storage.getItem('checkoutId')
        const updatedCart = await client.checkout.updateLineItems(checkoutId, [{id: item.id, quantity: 0}])
        storage.setItem('cart', JSON.stringify(updatedCart))
    }


    return (
        <>
            <h1>Cart</h1>

            {
                cartItems && cartItems.length !== 0 ? cartItems.map((item) => {
                    return (
                        <div className='cart-item' key={item.id}>
                            <div className="cart-item__image">
                                <Image src={item.variant.image.src} size={'small'}/>
                            </div>
                            <div className="cart-item__title">
                                <p>{item.title}</p>
                            </div>
                            <div className="cart-item__remove">
                                <Button color='red' size={"tiny"} onClick={(event, id) => {
                                    removeItem(event, item)
                                }}>Remove</Button>
                            </div>
                        </div>
                    )
                }) : <p>There are no items in cart</p>
            }
            <Button onClick={()=>{
                const storage = window.localStorage
                const cart = JSON.parse(storage.getItem('cart'))
                Router.replace(cart.webUrl)
            }}>Checkout</Button>
        </>
    )
}

export default Cart

