import { PREV_PAGE, NEXT_PAGE, ADD_DOGS, HANDLE_NUMBER, RESET_DOGS } from "./actions";

const initialState = {
    numPage: 1,
    dogs: [],
    dogsOrigin: []
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case HANDLE_NUMBER:
            return {
                ...state,
                numPage: payload
            }
        case NEXT_PAGE:
            return {
                ...state,
                numPage: state.numPage + 1
            }
        case PREV_PAGE:
            return {
                ...state,
                numPage: state.numPage - 1
            }
        case ADD_DOGS:
            if (Array.isArray(payload)) {
                return {
                    ...state,
                    dogs: [...state.dogs, ...payload],
                    dogsOrigin: [...state.dogs, ...payload],
                }
            }
            return {
                ...state,
                dogs: [payload]
            }
        case RESET_DOGS:
            return {
                ...state,
                dogs: [...state.dogsOrigin]
            }
        default:
            return state
    }
}