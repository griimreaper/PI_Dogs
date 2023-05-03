import axios from "axios"
export const NEXT_PAGE = "NEXT_PAGE"
export const PREV_PAGE = "PREV_PAGE"
export const ADD_DOGS = "ADD_DOGS"
export const HANDLE_NUMBER = "HANDLE_NUMBER"
export const RESET_DOGS = "RESET_DOGS"
export const ORDER_ALPHABETHYCALLY = "ORDER_ALPHABETYCALLY"
export const ORDER_WEIGHT = "ORDER_WEIGHT"
export const FILTER_CREATED = "FILTER_CREATED"
export const NEW_DOG = "NEW_DOG"
export const ADD_TEMPERAMENTS = "ADD_TEMPERAMENTS"
export const FILTER_TEMPERAMENT = "FILTER_TEMPERAMENT"

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
        type: RESET_DOGS,
    }
}
export const orderAlphabethycally = (order) => {
    return {
        type: ORDER_ALPHABETHYCALLY,
        payload: order
    }
}
export const orderWeight = (order) => {
    return {
        type: ORDER_WEIGHT,
        payload: order
    }
}
export const filterCreated = (created) => {
    return {
        type: FILTER_CREATED,
        payload: created
    }
}
export const newDog = (dog) => {
    const endpoint = "http://localhost:3001/dogs"
    return async (dispatch) => {
        try {
            const { data } = await axios.post(endpoint, dog)
            dispatch({
                type: NEW_DOG,
                payload: data,
            })
        } catch (error) {
            console.log(error)
        }
    }
}
export const addTemperaments = (temperaments) => {
    return {
        type:ADD_TEMPERAMENTS,
        payload: temperaments
    }
}
export const filterTemperament = (temperament) => {
    return {
        type:FILTER_TEMPERAMENT,
        payload:temperament
    }
}
