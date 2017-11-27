const initState = {
    isTransitionAllowed: false
};

export default function transitionInfo (state = initState, action) {
    switch(action.type) {
        case 'DISABLE_TRANSITION':
            return {
                ...state,
                isTransitionAllowed: false
            }
        case 'ENABLE_TRANSITION':
            return {
                ...state,
                isTransitionAllowed: true
            }
        default:
            return state;
    }
}