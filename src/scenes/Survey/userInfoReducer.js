const initState = {
    name: {
        value: '', 
        isValid: false
    },
    email: {
        value: '', 
        isValid: false
    },
    country: {
        value: '', 
        isValid: false
    },
    city: {
        value: '', 
        isValid: false
    },
    socials: {},
    catPhotoName: {
        value: '', 
        isValid: false
    }
}

function updateStateRegardingNesting (state, {inputType:propName, value, isValid}) {
    if (Array.isArray(propName)) {
       return {
           ...state,
           [propName[0]]: {
               ...state[propName[0]],
               [propName[1]]: {value, isValid}
            },         
        }
    }
    else return {
        ...state,
        [propName]: {
                    value: value,
                    isValid: isValid
                }};
}

function removeSocial (state, name) {
    return {
        ...state,
        socials: {
            ...Object.keys(state.socials)
            .reduce((res, social) => {
                if (social !== name) res[social] = state.socials[social];
                return res;
            }, {})
        }
    };
}

export default function userInfo (state = initState, action) {
    switch(action.type) {
        case 'UPDATE_VALUE':
            return updateStateRegardingNesting(state, action);
        case 'START_SURVEY':
            return {
                ...initState
            };
        case 'REMOVE_SOCIAL':
            return removeSocial(state, action.name);
        default:
            return state;

    }
}