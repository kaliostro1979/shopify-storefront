import {REMOVE_ITEM_FROM_CART} from "../types";
import {client} from "../../utils/shopify";

export const removeItemFromCartHandle = (id) => {
    return async (dispatch) => {
        const storage = window.localStorage
        let checkoutId = storage.getItem('checkoutId')
        const updatedCart = await client.checkout.updateLineItems(checkoutId, [{id: id, quantity: 0}])

        dispatch(removeItemFromCart(updatedCart))
    }
}


export const removeItemFromCart = (updatedItems) => {
    return {
        type: REMOVE_ITEM_FROM_CART,
        payload: updatedItems
    }
}