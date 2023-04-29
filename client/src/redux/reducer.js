import { PREV_PAGE, NEXT_PAGE, ADD_DOGS, HANDLE_NUMBER, RESET_DOGS, ORDER_ALPHABETHYCALLY, ORDER_WEIGHT, FILTER_CREATED, NEW_DOG } from "./actions";

const initialState = {
    numPage: 1,
    dogs: [],
    dogsOrigin: []
}

const reducer = (state = initialState, { type, payload }) => {
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
        case ORDER_ALPHABETHYCALLY:
            const sortedDogs = state.dogs.sort((a, b) => {
                const nameA = a.name.toUpperCase()
                const nameB = b.name.toUpperCase()
                if (nameA > nameB) {
                    return "Asc" === payload ? 1 : -1;
                }
                if (nameA < nameB) {
                    return "Desc" === payload ? 1 : -1;
                }
                return 0
            })
            return {
                ...state,
                dogs: sortedDogs
            }
        case ORDER_WEIGHT:
            const sortedWDogs = state.dogs.sort((a, b) => {
                const weightA = Math.round(Number(a.weight.split("-").map(t => t.trim())[a.weight.split("-").length - 1]))
                const weightB = Math.round(Number(b.weight.split("-").map(t => t.trim())[b.weight.split("-").length - 1]))
                if (weightA > weightB) {
                    return "Asc" === payload ? 1 : -1;
                }
                if (weightA < weightB) {
                    return "Desc" === payload ? 1 : -1;
                }
                return 0
            })
            return {
                ...state,
                dogs: sortedWDogs
            }
        case FILTER_CREATED:
            return {
                ...state,
                dogs: payload === "Created" ? state.dogsOrigin.filter((d) => d.hasOwnProperty("created")) : state.dogsOrigin.filter((d) => !d.hasOwnProperty("created"))
            }
        case NEW_DOG:
            return {
                ...state,
                dogs: [...state.dogs, payload],
                dogsOrigin: [...state.dogsOrigin, payload]
            }
        default:
            return state
    }
}

export default reducer;