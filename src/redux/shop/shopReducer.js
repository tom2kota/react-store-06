import {SHOP_DATA} from "./shopData";
import {UPDATE_COLLECTIONS} from "./shopTypes";

const INITIAL_STATE = {
    collections: SHOP_DATA
}

export const shopReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_COLLECTIONS:
            return {...state, collections: action.payload}
        default:
            return state
    }
}