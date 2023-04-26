export const NEXT_PAGE = "NEXT_PAGE"
export const PREV_PAGE = "PREV_PAGE"
export const ADD_DOGS = "ADD_DOGS"
export const HANDLE_NUMBER = "HANDLE_NUMBER"
export const RESET_DOGS = "RESET_DOGS"

export const nextPage = () => {
    return {
        type: NEXT_PAGE,
    }
}
export const prevPage = () => {
    return {
        type: PREV_PAGE,
    }
}
export const handleNumber = (num) => {
    return {
        type: HANDLE_NUMBER,
        payload: num
    }
}
export const addDogs = (dogs) => {
    return {
        type: ADD_DOGS,
        payload: dogs
    }
}
export const resetDogs = () => {
    return {
        type:RESET_DOGS,
    }
}

