import {CREATE_CHECKOUT_ID} from "../types";


const initialState = ''

export const checkoutId = (state = initialState, action)=>{
    switch (action.type) {
        case CREATE_CHECKOUT_ID:
            return state
        default:
            return state
    }
}