import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from './../components/Dashboard/MainHomeStackScreen';
import Profile from './../components/Dashboard/Profile';
import {Avatar} from 'react-native-paper';
import {useSelector} from 'react-redux';
import Vaccination from '../components/Vaccination/Vaccination';
import VaccinatedByYou from './../components/Dashboard/VaccinatedByYou';
const DashboardStack = createStackNavigator();

export const DasboardStackScreen = ({navigation}) => {
  const {user} = useSelector(state => state.auth);
  const headerRightImage =
    'https://media.istockphoto.com/vectors/user-sign-icon-person-symbol-human-avatar-vector-id639085642?k=20&m=639085642&s=170667a&w=0&h=Oz2wAbb8r_b8sU8k4yZ3RR4NRbe-s7GF0kxjs1aez9M=';
  return (
    <DashboardStack.Navigator
      screenOptions={{
        headerStyle: {
          elevation: 0,
        },
        headerTintColor: '#29364e',
        headerTitleStyle: {
          fontFamily: 'sans-serif-light',
        },
      }}>
      <DashboardStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Dashboard',
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={30}
              color="#29364e"
              backgroundColor="#ffffff"
              onPress={() => navigation.openDrawer()}
            />
          ),
          headerRight: () => (
            <TouchableOpacity
              style={{backgroundColor: '#ffffff', marginRight: 5}}
              onPress={() => navigation.navigate('Profile')}>
              <Avatar.Image
                size={44}
                source={{
                  uri: user ? user.profile.url : headerRightImage,
                }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <DashboardStack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: '',
          headerShown: false,
        }}
      />
      <DashboardStack.Screen
        name="vac_by_u"
        component={VaccinatedByYou}
        options={{
          title: 'Vaccinated By You',
        }}
      />
    </DashboardStack.Navigator>
  );
};
