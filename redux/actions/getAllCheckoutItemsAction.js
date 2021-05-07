import {GET_ALL_ITEMS_FROM_CHECKOUT, GET_CHECKOUT_OBJECT} from "../types";
import {client} from "../../utils/shopify";


export const getAllCheckoutItems = ()=>{
    return async (dispatch)=>{
        const storage = window.localStorage
        let checkoutId = storage.getItem('checkoutId')
        const itemsFromCheckout = await client.checkout.fetch(checkoutId)
        dispatch(getAllCheckoutItemsAction(itemsFromCheckout))
    }
}


const getAllCheckoutItemsAction = (items)=>{
    return {
        type: GET_ALL_ITEMS_FROM_CHECKOUT,
        payload: items
    }
}