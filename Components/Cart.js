import {useState, useEffect, useCallback} from 'react'
import {Button, Card, Feed, Image} from "semantic-ui-react";
import {client} from "../utils/shopify";
import Router from "next/router";


const Cart = ({allItems}) => {
    const [cartItems, setCartItems] = useState([])


    useEffect(async () => {
        setCartItems(allItems)
    }, [allItems])


    const removeItem = async (event, item) => {
        const storage = window.localStorage
        let checkoutId = storage.getItem('checkoutId')
        const updatedCart = await client.checkout.updateLineItems(checkoutId, [{id: item.id, quantity: 0}])
        console.log(updatedCart.lineItems);
        setCartItems(updatedCart.lineItems)
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
                            <div className="cart-item__variant-title">
                                <span>{item.variant.title}</span>
                            </div>
                            <div className="cart-item__quantity">
                                {item.quantity}
                            </div>
                            <div className="cart-item__price">
                                <span>{item.variant.priceV2.amount} </span>
                                <span>{item.variant.priceV2.currencyCode}</span>
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
            <Button
                onClick={() => {
                    const storage = window.localStorage
                    const cart = JSON.parse(storage.getItem('cart'))
                    Router.replace(cart.webUrl)
                }}
                disabled={cartItems.length === 0}

            >Checkout</Button>
        </>
    )
}




export default Cart

