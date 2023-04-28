const regexUrl = /\bhttps?:\/\/\S+\.(png|jpe?g|gif|bmp)\b/;
const regexDiff = /^(0*[1-9]|[1-9][0-9]|[12][0-9]{2}|300)\s*-\s*(0*[1-9]|[1-9][0-9]|[12][0-9]{2}|300)$/
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
        errors.weight = "Put an estimated weight: 10 - 20"
    } else {
        if (!regexDiff.test(dogData.weight)) {
            errors.weight = "You must put a minimum and a maximum value"
        }
    }
    if (!dogData.height) {
        errors.height = "Put an estimated height: 10 - 20"
    } else {
        if (!regexDiff.test(dogData.height)) {
            errors.height = "You must put a minimum and a maximum value"
        }
    }
    if (dogData.name.length > 12) {
        errors.name = "Cannot be longer than 12 characters"
    }
    if (!/^\d+/.test(dogData.age)) {
        errors.age = "Must have number"
    }

    return errors
}

