import { IS_FETCHING, GET_STAT_SUCCESS, GET_STAT_FAILED } from '../constants/ActionTypes';

const initState = {
    stat: null,
    error: null,
    isFetching: false
};
var getStat = (state = initState, action) => {
    switch(action.type){
        case IS_FETCHING:
            return { 
                ...state,
                stat: null,
                error: null,
                isFetching: true
            };
        case GET_STAT_FAILED:
            return {
                ...state,
                stat: null,
                error: true,
                isFetching: false
            }
        case GET_STAT_SUCCESS:
            return {
                ...state,
                stat: action.payload,
                error: null,
                isFetching: false
            }
        default:
            return {...state};
    }
}

export default getStat;