import {CREATE_CHECKOUT_ID} from "../types";
import {client} from "../../utils/shopify";


export const checkoutIdCreator = ()=>{
    return async (dispatch)=>{

        const storage = window.localStorage
        let checkoutId = storage.getItem('checkoutId')
        if (!checkoutId) {
            const checkOut = await client.checkout.create()
            checkoutId = checkOut.id
            storage.setItem('checkoutId', checkoutId)
        }

        dispatch(createCheckoutIdAction())
    }
}



export const createCheckoutIdAction = ()=>{
    return {
        type: CREATE_CHECKOUT_ID
    }
}