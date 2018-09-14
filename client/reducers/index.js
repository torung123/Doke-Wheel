import { combineReducers } from 'redux';
import stat from './stat';
import settingDisplay from './settingDisplay';
import slices from './slices';
import updateSetting from './updateSetting';
import updateSlices from './updateSlices';
import mailchimp from './mailchimp';
import exportFile from './exportFile';

const myReducer = combineReducers({
    stat,
    settingDisplay,
    slices,
    updateSetting,
    updateSlices,
    mailchimp,
    exportFile
});

export default myReducer;