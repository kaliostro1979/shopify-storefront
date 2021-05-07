import {ADD_TO_CART} from "../types";
import {client} from "../../utils/shopify";



export const handleAddToCart = (variant, quantity)=>{

    return async (dispatch)=>{
        const storage = window.localStorage
        let checkoutId = storage.getItem('checkoutId')
        if (!checkoutId) {
            const checkOut = await client.checkout.create()
            checkoutId = checkOut.id
            storage.setItem('checkoutId', checkoutId)
        }

        const cart = await client.checkout.addLineItems(checkoutId, [{
            variantId: variant.id,
            quantity: quantity
        }])

        storage.setItem('cart', JSON.stringify(cart))
        dispatch(addToCartAction(cart))
    }
}


export const addToCartAction = (cartItems)=>{
    return{
        type: ADD_TO_CART,
        payload: cartItems
    }
}