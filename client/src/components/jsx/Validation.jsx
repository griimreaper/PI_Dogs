const regexUrl = /\bhttps?:\/\/\S+\.(png|jpe?g|gif|bmp)\b/;

export function validate(dogData) {
    let errors = {}
    if (!regexUrl.test(dogData.image)) {
        errors.image = "Must be a url"
    }
    if (!dogData.image) {
        errors.image = "It cant be empty"
    }
    if (!dogData.name) {
        errors.name = "It cant be empty"
    }
    if (!dogData.age) {
        errors.age = "It cant be empty"
    }
    if (!dogData.weight) {
        errors.weight = "It cant be empty"
    }
    if (!dogData.height) {
        errors.height = "It cant be empty"
    }
    if (dogData.name.length > 12) {
        errors.name = "Cannot be longer than 12 characters"
    }
    if (!/\d/.test(dogData.weight)) {
        errors.weight = "Must have number"
    }
    if (!/\d/.test(dogData.height)) {
        errors.height = "Must have number"
    }
    if (!/\d/.test(dogData.age)) {
        errors.age = "Must have number"
    }

    return errors
}

