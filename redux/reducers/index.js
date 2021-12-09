import {combineReducers} from 'redux';
import authReducer from './auth.reducers';
import scheduleReducers from './schedule.reducers';

const rootReducer = combineReducers({
  auth: authReducer,
  schedule: scheduleReducers,
});

export default rootReducer;
