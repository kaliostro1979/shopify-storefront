import {cart} from "./cart";
import {combineReducers} from "redux";
import {checkoutId} from "./checkoutId";

export const rootReducer = combineReducers({
    cart: cart,
    checkoutId: checkoutId
})