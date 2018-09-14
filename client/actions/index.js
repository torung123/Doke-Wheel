import {
    IS_FETCHING,
    GET_STAT_SUCCESS,
    GET_STAT_FAILED,
    GET_SETTING_SUCCESS, 
    GET_SETTING_FAILED,
    GET_SLICES_SUCCESS,
    GET_SLICES_FAILED,
    IS_UPDATE_SETTING,
    UPDATE_SETTING_SUCCESS,
    UPDATE_SETTING_FAILED,
    IS_UPDATE_SLICES,
    UPDATE_SLICES_SUCCESS,
    UPDATE_SLICES_FAILED,
    GET_MAILCHIMP_SUCCESS, 
    GET_MAILCHIMP_FAILED,
    IS_UPDATE_MAILCHIMP,
    UPDATE_MAILCHIMP_SUCCESS,
    UPDATE_MAILCHIMP_FAILED,
    IS_CHECKING_MAILCHIMP,
    CHECK_MAILCHIMP_CONNECT,
    IS_EXPORT_FILE,
    EXPORT_FILE_SUCCESS,
    EXPORT_FILE_FAILED,
    IS_RESETTING_COOKIE,
    RESET_COOKIE
} from '../constants/ActionTypes';
import callApi from './../utils/apiCaller';

export const actGetStat = (shopName) => {

    return dispatch => {
        dispatch({
            type: IS_FETCHING
        })
        return callApi(`statictic/${shopName}`, 'GET', null).then(res => {
            if (res.data.error){
                dispatch({
                  type: GET_STAT_FAILED,
                  payload: res.data
                })
          
            } else {
                dispatch({
                  type: GET_STAT_SUCCESS,
                  payload: res.data.stat
                })
            } 
        })
    }
}

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

export const actResetCookie = (shopName) => {
    return dispatch => {
        dispatch({
            type: IS_RESETTING_COOKIE
        })
        return callApi(`reset-cookie/${shopName}`, 'GET', null).then(res => {
            dispatch({
                type: RESET_COOKIE,
                payload: res.data
            })
        })
    }
}

export const actGetMailchimp = (shopName) => {
    return dispatch => {
        dispatch({
            type: IS_FETCHING
        })
        return callApi(`mailchimp/${shopName}`, 'GET', null).then(res => {
            if (res.data.error){
                dispatch({
                  type: GET_MAILCHIMP_FAILED,
                  payload: res.data
                })
          
            } else {
                dispatch({
                  type: GET_MAILCHIMP_SUCCESS,
                  payload: res.data.mailchimp
                })
            } 
        })
    }
}

export const actUpdateMailchimp = (shopName, mailchimp) => {
    return dispatch => {
        dispatch({
            type: IS_UPDATE_MAILCHIMP
        })
        const body = {
            mailchimp
        }
        return callApi(`update-mailchimp/${shopName}`, 'POST', body).then(res => {
            if (res.data.error){
                dispatch({
                    type: UPDATE_MAILCHIMP_FAILED,
                    payload: res.data
                })
            } else {
                dispatch({
                    type: UPDATE_MAILCHIMP_SUCCESS,
                    payload: res.data
                })
            } 
        })
    }
}

export const actCheckMailchimp = (mailchimpApiKey, listUniqueId) => {
    return dispatch => {
        dispatch({
            type: IS_CHECKING_MAILCHIMP
        })
        const body = {
            mailchimpApiKey,
            listUniqueId
        }
        return callApi(`check-mailchimp`, 'POST', body).then(res => {
            dispatch({
                type: CHECK_MAILCHIMP_CONNECT,
                payload: res.data
            })
        })
    }
}

export const actExportFile = (shopName) => {
    return dispatch => {
        dispatch({
            type: IS_EXPORT_FILE
        })
        return callApi(`export/${shopName}`, 'GET', null).then(res => {
            if (res.data.error){
                dispatch({
                    type: EXPORT_FILE_FAILED,
                    payload: res.data
                })
            } else {
                dispatch({
                    type: EXPORT_FILE_SUCCESS,
                    payload: res.data
                })
            } 
        })
    }
}