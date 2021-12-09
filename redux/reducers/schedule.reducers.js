import {scheduleConstant} from '../constants';

const INITIAL_STATE = {
  loading: false,
  todaySchedule: null,
  vaccinated: null,
};

const scheduleReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case scheduleConstant.Schedule_Request:
      return (state = {
        ...state,
        loading: false,
      });
    case scheduleConstant.GET_SCHEDULE_SUCCESS:
      return (state = {
        ...state,
        todaySchedule: action.payload.schedule,
      });
    case scheduleConstant.GET_SCHEDULE_FAIL:
      return (state = {
        ...state,
        loading: false,
      });
    case scheduleConstant.GET_VACCINATED_BY_YOU_SUCCESS:
      return (state = {
        ...state,
        vaccinated: action.payload,
        loading: false,
      });
    case scheduleConstant.GET_VACCINATED_BY_YOU_FAIL:
      return (state = {
        ...state,
        loading: false,
      });
    default:
      return state;
  }
};

export default scheduleReducers;
