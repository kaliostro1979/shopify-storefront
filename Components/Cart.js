import {useState, useEffect, useCallback} from 'react'
import {Button, Card, Feed, Image} from "semantic-ui-react";
import {client} from "../utils/shopify";
import Router from "next/router";


const Cart = ({allItems, checkoutObject, currencySymbol}) => {
    const [cartItems, setCartItems] = useState([])
    const [totalPrice, setTotalPrice] = useState('')


    useEffect(async () => {
        setCartItems(allItems)
        if (checkoutObject.totalPriceV2) {
            setTotalPrice(checkoutObject.totalPriceV2.amount)
        }
    }, [allItems, checkoutObject])

    const removeItem = async (event, item) => {
        const storage = window.localStorage
        let checkoutId = storage.getItem('checkoutId')
        const updatedCart = await client.checkout.updateLineItems(checkoutId, [{id: item.id, quantity: 0}])
        setCartItems(updatedCart.lineItems)
        setTotalPrice(updatedCart.totalPriceV2.amount)
    }

    return (
        <>
            <h1>Cart</h1>
            <Card.Group centered>
                {
                    cartItems && cartItems.length !== 0 ? cartItems.map((item) => {

                        return (

                            <Card key={item.id} centered fluid>
                                <Card.Content>
                                    <Image
                                        floated='left'
                                        size='mini'
                                        src={item.variant.image.src} size={'small'}
                                    />
                                    <Card.Header>
                                        <strong>{item.title}</strong>
                                    </Card.Header>
                                    <Card.Meta>
                                        <p>Variant: {item.variant.title}</p>
                                        <p>Quantity: {item.quantity}</p>
                                        <strong>{item.variant.priceV2.amount * item.quantity} </strong>
                                        <strong>{currencySymbol}</strong>
                                    </Card.Meta>
                                </Card.Content>
                                <Card.Content extra>
                                    <div className='ui buttons'>
                                        <Button basic color='red' onClick={(event, id) => {
                                            removeItem(event, item)
                                        }}>Remove</Button>
                                    </div>
                                </Card.Content>
                            </Card>
                        )
                    }) : <article className='noCartText'>There are no items in cart</article>
                }
                <Card.Description className="total-amount">
                    {
                        cartItems && cartItems.length !== 0 ?
                            <div className='total-price'>
                                <span className='total-price__label'>Total price: </span>
                                <span> {totalPrice} </span>
                                <span>{currencySymbol}</span>
                            </div> : ''
                    }
                </Card.Description>
            </Card.Group>

            <Button
                onClick={() => {
                    const storage = window.localStorage
                    const cart = JSON.parse(storage.getItem('cart'))
                    Router.replace(cart.webUrl)
                }}
                disabled={cartItems.length === 0}
                className='checkout-btn'
            >Checkout</Button>
        </>
    )
}


export default Cart

