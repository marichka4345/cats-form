import { combineReducers } from 'redux';
import { createStore } from 'redux';
import userInfo from './scenes/Survey/userInfoReducer';
import topBar from './scenes/Survey/components/Topbar/topBarReducer';
import transitionInfo from './scenes/Survey/components/CommonForm/transitionInfoReducer';


const rootReducer = combineReducers({
    userInfo,
    topBar,
    transitionInfo
});
 
export default createStore(rootReducer);