import {ADD_TO_CART, GET_ALL_ITEMS_FROM_CHECKOUT, GET_CHECKOUT_OBJECT, REMOVE_ITEM_FROM_CART} from "../types";


const initialState = []

export const cart = (state = initialState, action)=>{
    switch (action.type) {
        case ADD_TO_CART:
            return action.payload
        case REMOVE_ITEM_FROM_CART:
            return action.payload
        case GET_ALL_ITEMS_FROM_CHECKOUT:
            return action.payload
        default:
            return state
    }
}