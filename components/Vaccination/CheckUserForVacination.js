import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import axiosInstance from '../../helpers/axios';
import {useFocusEffect} from '@react-navigation/native';
import {Subheading, Caption, ActivityIndicator} from 'react-native-paper';
import {toCapitalized} from '../../reusable';
import {useSelector} from 'react-redux';
import Fontisto from 'react-native-vector-icons/Fontisto';
const CheckUserForVacination = props => {
  const {container, constainerLoading} = styles;
  const [Loading, setLoading] = useState(false);
  const {todaySchedule} = useSelector(state => state.schedule);
  const {type, userId, vaccine, userInformation} = props.route.params;

  const {user} = useSelector(state => state.auth);

  const handleConfirm = () => {
    Alert.alert('Warning', 'You Wont Revert This action', [
      {
        text: 'Cancel',
        onPress: async () => {},
        style: 'cancel',
      },
      {
        text: 'OK, Vaccinate',
        onPress: async () => {
          try {
            setLoading(true);
            const res = await axiosInstance.post(
              '/api/vaccinator/vaccinating-user-by-vaccinator',
              {
                vaccinator: user._id,
                userId,
                vaccine,
                schedule: todaySchedule._id,
                dose: type,
              },
            );
            if (res.status === 200) {
              Alert.alert('Success', 'Successfully Vaccinated');
              setLoading(false);
              props.navigation.navigate('Vaccination');
              return;
            }
            Alert.alert('Warning', res.data.msg);
            setLoading(false);
          } catch (e) {
            Alert.alert('Warning', e.response.data.msg);
            setLoading(false);
          }
        },
      },
    ]);
  };
  const handleExit = () => {
    Alert.alert('Warning', 'Are You Sure You to Exit', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK, Exit',
        onPress: () => {
          props.navigation.navigate('Vaccination');
        },
      },
    ]);
  };

  console.log(user._id);
  return Loading ? (
    <View style={constainerLoading}>
      <ActivityIndicator animating={true} color={'#ffb247'} size="50" />
      <Caption>Authenticating ...</Caption>
      <Subheading>wait for response</Subheading>
    </View>
  ) : (
    <View style={container}>
      {userInformation ? (
        <View style={styles.profileContainer}>
          {userInformation.sex === 'Male' ? (
            <Image
              source={require('./../../assets/icons/male.png')}
              style={styles.profile}
            />
          ) : (
            <Image
              source={require('./../../assets/icons/female.png')}
              style={styles.profile}
            />
          )}
        </View>
      ) : null}
      <View style={styles.informationContainer}>
        <View style={{width: '60%'}}>
          <Caption
            style={{
              color: '#67BDFE',
              fontWeight: '500',
              letterSpacing: 1,
              fontSize: 18,
            }}>
            {userInformation
              ? toCapitalized(
                  `${userInformation.name} ${userInformation.middleName} ${userInformation.lastName},  ${userInformation.age} `,
                )
              : ''}
          </Caption>
          <Caption>
            {userInformation
              ? toCapitalized(userInformation.barangay.barangayName)
              : ''}
          </Caption>
        </View>
        <View style={{width: '40%'}}>
          <Caption
            style={{
              color: '#67BDFE',
              fontWeight: '500',
              letterSpacing: 1,
              fontSize: 18,
              textAlign: 'center',
            }}>
            {todaySchedule
              ? toCapitalized(todaySchedule.vaccineType.vaccineName)
              : ''}
            <Fontisto
              size={20}
              name="injection-syringe"
              style={{marginLeft: 5}}
            />
          </Caption>
        </View>
      </View>
      <Caption style={{padding: 10}}>
        I Authorized My Self to be Vaccinated by{' '}
        {todaySchedule
          ? toCapitalized(todaySchedule.vaccineType.vaccineName)
          : ''}
      </Caption>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          textAlign: 'center',
          marginTop: 80,
        }}>
        <View style={{width: '50%'}}>
          <TouchableOpacity
            style={styles.touchInputContainer}
            onPress={handleExit}>
            <Fontisto
              size={25}
              name="close-a"
              style={{marginLeft: 5}}
              color={'#ffffff'}
            />
          </TouchableOpacity>
        </View>
        <View style={{width: '50%'}}>
          <TouchableOpacity
            style={styles.touchInputContainer}
            onPress={handleConfirm}>
            <Fontisto
              size={25}
              name="check"
              style={{marginLeft: 5}}
              color={'#ffffff'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default CheckUserForVacination;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9FDFE',
  },
  constainerLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  profileContainer: {
    width: '75%',
    justifySelf: 'center',
    alignSelf: 'center',
    padding: 10,
    position: 'relative',

    marginTop: 20,
    backgroundColor: '#C2E6FF',
    borderRadius: 10,
    elevation: 5,
  },
  profile: {
    width: '100%',
    height: 350,
  },
  informationContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 10,
    position: 'relative',
    marginTop: 40,
  },
  touchInputContainer: {
    width: 90,
    height: 90,
    display: 'flex',
    borderRadius: 90 / 2,
    backgroundColor: '#1862C5',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    justifySelf: 'center',
    alignSelf: 'center',
    elevation: 5,
  },
});
