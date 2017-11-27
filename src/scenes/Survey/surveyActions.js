export function updateValue (payload) {
    return {
        type: 'UPDATE_VALUE',
        ...payload
    }
}

export function removeSocial (payload) {
    return {
        type: 'REMOVE_SOCIAL',
        ...payload
    }
}