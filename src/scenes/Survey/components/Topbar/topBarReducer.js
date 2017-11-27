const initState = {
    activeElementId: 1,
    stepsNumber: 4,
    showFinal: false
}

export default function topBar (state = initState, action) {
    switch (action.type) {
        case 'INCREMENT_ACTIVE_ID':
            return {
                ...state,
                activeElementId: state.activeElementId + 1
            }
        case 'DECREMENT_ACTIVE_ID':
            return {
                ...state,
                activeElementId: state.activeElementId - 1
            }
        case 'SHOW_FINAL_INFO':
            return {
                ...state,
                showFinal: true
            }
        case 'START_SURVEY':
            return {
                ...initState
            }
        default: 
            return state;
    }
}