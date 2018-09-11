import { IS_UPDATE_SETTING, UPDATE_SETTING_SUCCESS, UPDATE_SETTING_FAILED  } from '../constants/ActionTypes';

const initState = {
    isUpdateSetting: false,
    setting: null,
    error: null,
    message: ''
};
var updateSetting = (state = initState, action) => {
    switch(action.type){
        case IS_UPDATE_SETTING:
            return { 
                ...state,
                isUpdateSetting: true,
                setting: null,
                error: null
            };
        case UPDATE_SETTING_SUCCESS:
            return { 
                ...state,
                isUpdateSetting: false,
                setting: action.payload,
                error: false,
                message: 'Update success'
            };
        case UPDATE_SETTING_FAILED:
            return { 
                ...state,
                isUpdateSetting: false,
                setting: null,
                error: true,
                message: 'Update failed'
            };
        default:
            return {...state};
    }
}

export default updateSetting;