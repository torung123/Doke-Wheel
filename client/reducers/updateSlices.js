import { IS_UPDATE_SLICES, UPDATE_SLICES_SUCCESS, UPDATE_SLICES_FAILED  } from '../constants/ActionTypes';

const initState = {
    isUpdateSlices: false,
    slices: null,
    error: null,
    message: ''
};
var updateSlices = (state = initState, action) => {
    switch(action.type){
        case IS_UPDATE_SLICES:
            return { 
                ...state,
                isUpdateSlices: true,
                slices: null,
                error: null
            };
        case UPDATE_SLICES_SUCCESS:
            return { 
                ...state,
                isUpdateSlices: false,
                slices: action.payload,
                error: false,
                message: 'Update success'
            };
        case UPDATE_SLICES_FAILED:
            return { 
                ...state,
                isUpdateSlices: false,
                slices: null,
                error: true,
                message: 'Update failed'
            };
        default:
            return {...state};
    }
}

export default updateSlices;