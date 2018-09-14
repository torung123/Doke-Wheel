import { IS_FETCHING, 
    GET_MAILCHIMP_SUCCESS, 
    GET_MAILCHIMP_FAILED, 
    IS_UPDATE_MAILCHIMP, 
    UPDATE_MAILCHIMP_SUCCESS,
    UPDATE_MAILCHIMP_FAILED,
    IS_CHECKING_MAILCHIMP,
    CHECK_MAILCHIMP_CONNECT
 } from '../constants/ActionTypes';

const initState = {
    mailchimp: null,
    error: null,
    isFetching: false,
    isUpdateMailchimp: false,
    checkConnect: null,
    isChecking: false,
};
var mailchimp = (state = initState, action) => {
    switch(action.type){
        case IS_FETCHING:
            return { 
                ...state,
                mailchimp: null,
                error: null,
                isFetching: true
            };
        case GET_MAILCHIMP_FAILED:
            return {
                ...state,
                mailchimp: null,
                error: true,
                isFetching: false
            }
        case GET_MAILCHIMP_SUCCESS:
            return {
                ...state,
                mailchimp: action.payload,
                error: null,
                isFetching: false
            }
        case IS_UPDATE_MAILCHIMP:
            return { 
                ...state,
                isUpdateMailchimp: true,
                mailchimp: null,
                error: null
            };
        case UPDATE_MAILCHIMP_SUCCESS:
            return { 
                ...state,
                mailchimp: action.payload,
                isUpdateMailchimp: false,
                error: false,
                message: 'Update success'
            };
        case UPDATE_MAILCHIMP_FAILED:
            return { 
                ...state,
                mailchimp: null,
                isUpdateMailchimp: false,
                error: true,
                message: 'Update failed'
            };
        case IS_CHECKING_MAILCHIMP:
            return { 
                ...state,
                isChecking: true
            };
        case CHECK_MAILCHIMP_CONNECT:
            return { 
                ...state,
                isFetching: false,
                isChecking: false,
                checkConnect: action.payload
            };
        default:
            return {...state};
    }
}

export default mailchimp;