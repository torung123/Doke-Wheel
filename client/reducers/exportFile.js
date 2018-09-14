import { IS_EXPORT_FILE,
    EXPORT_FILE_SUCCESS,
    EXPORT_FILE_FAILED
 } from '../constants/ActionTypes';

const initState = {
    error: null,
    isFetching: false,
    link: null,
};
var exportFile = (state = initState, action) => {
    switch(action.type){
        case IS_EXPORT_FILE:
            return { 
                ...state,
                link: null,
                error: null,
                isFetching: true
            };
        case EXPORT_FILE_FAILED:
            return {
                ...state,
                link: null,
                error: true,
                isFetching: false
            }
        case EXPORT_FILE_SUCCESS:
            return {
                ...state,
                link: action.payload,
                error: null,
                isFetching: false
            }
        
        default:
            return {...state};
    }
}

export default exportFile;