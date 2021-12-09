import {scheduleConstant} from '../constants';
import axiosInstance from '../../helpers/axios';
import {Alert} from 'react-native';
export const getScheduleToday = data => {
  return async dispatch => {
    try {
      const res = await axiosInstance.get('/api/schedule/get-today-schedules');
      console.log(res.data);
      if (res.status === 200) {
        dispatch({
          type: scheduleConstant.GET_SCHEDULE_SUCCESS,
          payload: {schedule: res.data.schedule},
        });
        return true;
      }
      dispatch({type: scheduleConstant.GET_SCHEDULE_FAIL});
      console.log('hihixx');
      return false;
    } catch (e) {
      console.log('hihi11');
      dispatch({type: scheduleConstant.GET_SCHEDULE_FAIL});
      return false;
    }
  };
};
export const vaccinatedAndSchedule = data => {
  return async dispatch => {
    try {
      const res = await axiosInstance.post(
        '/api/schedule/get-totol-vaccinated-person-and-vaccinator',
        data,
      );
      if (res.status === 200) {
        dispatch({
          type: scheduleConstant.GET_VACCINATED_BY_YOU_SUCCESS,
          payload: res.data,
        });
      }
    } catch (e) {}
  };
};
