import { combineReducers } from 'redux';
import settingDisplay from './settingDisplay';
import slices from './slices';
import updateSetting from './updateSetting';
import updateSlices from './updateSlices';

const myReducer = combineReducers({
    settingDisplay,
    slices,
    updateSetting,
    updateSlices
});

export default myReducer;