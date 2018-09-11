import { IS_FETCHING, GET_SETTING_SUCCESS, GET_SETTING_FAILED  } from '../constants/ActionTypes';

const initState = {
    setting: null,
    error: null,
    isFetching: false
};
var getSetting = (state = initState, action) => {
    switch(action.type){
        case IS_FETCHING:
            return { 
                ...state,
                setting: null,
                error: null,
                isFetching: true
            };
        case GET_SETTING_FAILED:
            return {
                ...state,
                setting: null,
                error: true,
                isFetching: false
            }
        case GET_SETTING_SUCCESS:
            return {
                ...state,
                setting: action.payload,
                error: null,
                isFetching: false
            }
        default:
            return {...state};
    }
}

export default getSetting;