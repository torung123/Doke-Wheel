import { IS_FETCHING, 
    GET_SETTING_SUCCESS, 
    GET_SETTING_FAILED,
    GET_SLICES_SUCCESS,
    GET_SLICES_FAILED,
    IS_UPDATE_SETTING,
    UPDATE_SETTING_SUCCESS,
    UPDATE_SETTING_FAILED,
    IS_UPDATE_SLICES,
    UPDATE_SLICES_SUCCESS,
    UPDATE_SLICES_FAILED
} from '../constants/ActionTypes';
import callApi from './../utils/apiCaller';

export const actGetSetting = (shopName) => {

    return dispatch => {
        dispatch({
            type: IS_FETCHING
        })
        return callApi(`setting/${shopName}`, 'GET', null).then(res => {
            if (res.data.error){
                dispatch({
                  type: GET_SETTING_FAILED,
                  payload: res.data
                })
          
            } else {
                dispatch({
                  type: GET_SETTING_SUCCESS,
                  payload: res.data.setting
                })
            } 
        })
    }
}

export const actGetSlices = (shopName) => {

    return dispatch => {
        dispatch({
            type: IS_FETCHING
        })
        return callApi(`slices/${shopName}`, 'GET', null).then(res => {
            if (res.data.error){
                dispatch({
                  type: GET_SLICES_FAILED,
                  payload: res.data
                })
          
            } else {
                dispatch({
                  type: GET_SLICES_SUCCESS,
                  payload: res.data.slices
                })
            } 
        })
    }
}

export const actUpdateSetting = (shopName, setting) => {
    return dispatch => {
        dispatch({
            type: IS_UPDATE_SETTING
        })
        const body = {
            setting
        }
        return callApi(`update-setting/${shopName}`, 'POST', body).then(res => {
            if (res.data.error){
                dispatch({
                  type: UPDATE_SETTING_FAILED,
                  payload: res.data
                })
            } else {
                dispatch({
                  type: UPDATE_SETTING_SUCCESS,
                  payload: res.data
                })
            } 
        })
    }
}

export const actUpdateSlices = (shopName, slices) => {
    return dispatch => {
        dispatch({
            type: IS_UPDATE_SLICES
        })
        const body = {
            slices
        }
        return callApi(`update-slices/${shopName}`, 'POST', body).then(res => {
            if (res.data.error){
                dispatch({
                    type: UPDATE_SLICES_FAILED,
                    payload: res.data
                })
            } else {
                dispatch({
                    type: UPDATE_SLICES_SUCCESS,
                    payload: res.data
                })
            } 
        })
    }
}
