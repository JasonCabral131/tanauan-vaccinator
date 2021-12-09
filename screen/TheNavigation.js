import React, {useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {useDispatch, useSelector} from 'react-redux';
import TheDrawerScreen from '../components/TheDrawerScreen';

import {DasboardStackScreen} from './StackScreen';
import Vaccination from '../components/Vaccination/Vaccination';
import {
  getScheduleToday,
  vaccinatedAndSchedule,
} from '../redux/actions/schedule.actions';
import DoesNotHaveVaccinationSchedule from '../components/Vaccination/DoesHaveVaccineSchedule';
import CheckUserForVacination from '../components/Vaccination/CheckUserForVacination';
const Drawer = createDrawerNavigator();
const TheNavigation = props => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const {user} = auth;
  const {todaySchedule} = useSelector(state => state.schedule);
  useEffect(() => {
    dispatch(getScheduleToday());
    dispatch(vaccinatedAndSchedule({vaccinator: user._id}));
  }, [auth]);

  return (
    <NavigationContainer options={{title: 'Vaccinator'}}>
      <Drawer.Navigator
        drawerContent={props => <TheDrawerScreen {...props} />}
        screenOptions={{
          headerShown: false,
        }}>
        <Drawer.Screen name="Dashboard" component={DasboardStackScreen} />
        <Drawer.Screen name="Vaccination">
          {props =>
            todaySchedule ? (
              <Vaccination {...props} />
            ) : (
              <DoesNotHaveVaccinationSchedule {...props} />
            )
          }
        </Drawer.Screen>
        <Drawer.Screen
          name="no-sched"
          options={{headerShown: false}}
          component={DoesNotHaveVaccinationSchedule}
        />
        <Drawer.Screen
          name="ShowUserInformation"
          options={{headerShown: false}}
          component={CheckUserForVacination}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
export default TheNavigation;

console.disableYellowBox = true;
