import { IS_FETCHING, GET_SLICES_SUCCESS, GET_SLICES_FAILED  } from '../constants/ActionTypes';

const initState = {
    slices: null,
    error: null,
    isFetching: false,
};
var getSlices = (state = initState, action) => {
    switch(action.type){
        case IS_FETCHING:
            return { 
                ...state,
                slices: null,
                error: null,
                isFetching: true
            };
        case GET_SLICES_FAILED:
            return {
                ...state,
                slices: null,
                error: true,
                isFetching: false
            }
        case GET_SLICES_SUCCESS:
            return {
                ...state,
                slices: action.payload,
                error: null,
                isFetching: false
            }
        default:
            return {...state};
    }
}

export default getSlices;