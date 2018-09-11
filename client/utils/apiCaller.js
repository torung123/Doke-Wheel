import axios from 'axios';
// import * as Config from '../constants/Config';
export const API_URL = 'https://e3bbfce3.ngrok.io/api';

export default function callApi(endpoint, method = 'GET', body){
    return axios({
        method: method,
        url: `${API_URL}/${endpoint}`,
        data: body
    }).catch(err => {
        console.log(err);
    });
};
