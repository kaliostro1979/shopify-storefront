import {useState, useEffect, useCallback} from 'react'
import {Button, Card, Feed, Image} from "semantic-ui-react";
import {client} from "../utils/shopify";
import Router from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {removeItemFromCartHandle} from "../redux/actions/removeItemFromCartAction";
import {getAllCheckoutItems} from "../redux/actions/getAllCheckoutItemsAction";


const Cart = ({ checkoutObject, currencySymbol}) => {

    const state = useSelector(state=>state.cart)
    const dispatch = useDispatch()


    useEffect(async () => {
        dispatch(getAllCheckoutItems())
    }, [checkoutObject])


    return (
        <>
            <h1>Cart</h1>

            <Card.Group centered>
                {
                    state.lineItems && state.lineItems.length !== 0 ? state.lineItems.map((item) => {

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
                                        <Button basic color='red' onClick={() => {
                                            dispatch(removeItemFromCartHandle(item.id))
                                        }}>Remove</Button>
                                    </div>
                                </Card.Content>
                            </Card>
                        )
                    }) : <article className='noCartText'>There are no items in cart</article>
                }
                <Card.Description className="total-amount">
                    {
                        state.lineItems && state.lineItems.length !== 0 ?
                            <div className='total-price'>
                                <span className='total-price__label'>Total price: </span>
                                <span> {state.totalPriceV2.amount} </span>
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
                disabled={state.lineItems && state.lineItems.length === 0}
                className='checkout-btn'
            >Checkout</Button>
        </>
    )
}


export default Cart

