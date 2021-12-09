import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Alert} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import RNSystemSounds from '@dashdoc/react-native-system-sounds';
import {RNCamera} from 'react-native-camera';
import {
  Subheading,
  Caption,
  Headline,
  Avatar,
  ActivityIndicator,
} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {toCapitalized} from '../../reusable';
import axiosInstance from '../../helpers/axios';
const Vaccination = props => {
  const {qrcodeContainer, addContainerView, constainerLoading} = styles;
  const {user} = useSelector(state => state.auth);
  const {todaySchedule} = useSelector(state => state.schedule);
  const [cameratype, setCameraType] = useState(false);
  const [Loading, setLoading] = useState(false);
  const ifScanneed = async data => {
    RNSystemSounds.beep();
    if (typeof data === 'object') {
      try {
        const userId = data.data;
        const vaccine = todaySchedule.vaccineType._id;
        setLoading(true);

        const res = await axiosInstance.post(
          '/api/vaccinator/to-know-if-vaccinated',
          {userId, vaccine},
        );
        setLoading(false);
        if (res.status === 200) {
          Alert.alert(res.data.type, res.data.msg);
          props.navigation.navigate('ShowUserInformation', {
            type: res.data.type,
            userId,
            vaccine,
            userInformation: res.data.userInfo,
          });
          return;
        }
        Alert.alert('Warning', res.data.msg);
        return;
      } catch (e) {
        console.log(e.response.status);
        Alert.alert('Warning', e.response.data.msg);
        setLoading(false);
      }
    } else {
      console.log('deriii');
      Alert.alert('Warning', 'Invalid QRCODE');
    }
  };

  return Loading ? (
    <View style={constainerLoading}>
      <ActivityIndicator animating={true} color={'#ffb247'} size="50" />
      <Caption>Authenticating ...</Caption>
      <Subheading>wait for response</Subheading>
    </View>
  ) : (
    <View style={addContainerView}>
      <View style={qrcodeContainer}>
        <QRCodeScanner
          containerStyle={{
            backgroundColor: '#ffffff',
            height: '100%',
          }}
          onRead={ifScanneed}
          permissionDialogMessage="Need Permission To Access Camera"
          flashMode={RNCamera.Constants.FlashMode.on}
          reactivate={true}
          reactivateTimeout={1500}
          showMarker={true}
          fadeIn={true}
          cameraType={cameratype ? 'front' : 'back'}
          cameraStyle={{
            width: '100%',
            height: '100%',
          }}
          markerStyle={{borderColor: '#fff', borderRadius: 10}}
        />

        <TouchableOpacity
          onPress={() => setCameraType(!cameratype)}
          style={styles.changingCamera}>
          <Icon size={30} name="camera-retake-outline" color={'#ffffff'} />
        </TouchableOpacity>
      </View>
      <View style={styles.headingContainer}>
        <LinearGradient
          start={{x: 0.6, y: 0.35}}
          end={{x: 0.5, y: 2.0}}
          locations={[0.4, 1, 0.6]}
          colors={['#fafc77', '#47e2ed', '#192f6a']}
          style={{width: 100, height: 10, marginTop: 10}}
        />
        <Headline style={{textAlign: 'left', display: 'flex'}}>
          Vaccination
        </Headline>
        <View style={styles.vaccinatorContainer}>
          <Avatar.Image
            size={44}
            source={{
              uri: user
                ? user.profile.url
                : 'https://media.istockphoto.com/vectors/user-sign-icon-person-symbol-human-avatar-vector-id639085642?k=20&m=639085642&s=170667a&w=0&h=Oz2wAbb8r_b8sU8k4yZ3RR4NRbe-s7GF0kxjs1aez9M=',
            }}
          />
          <View style={{marginLeft: 5}}>
            <Subheading>
              {' '}
              {user
                ? toCapitalized(
                    `${user.firstname} ${user.middlename} ${user.lastname}`,
                  )
                : ''}
            </Subheading>
            <Caption style={{textAlign: 'center', display: 'flex'}}>
              Your Vaccinator
            </Caption>
          </View>
        </View>
        <Caption style={styles.yourVaccine}>
          Your Vaccine :{' '}
          <Caption
            style={{
              textAlign: 'center',
              display: 'flex',
              fontSize: 12,
              fontWeight: '800',
            }}>
            {todaySchedule
              ? toCapitalized(todaySchedule.vaccineType.vaccineName)
              : ''}
          </Caption>
        </Caption>
      </View>
    </View>
  );
};
export default Vaccination;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    margin: 0,
    padding: 0,
  },
  addContainerView: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  },
  qrcodeContainer: {
    height: '80%',
    width: '100%',
    position: 'relative',
  },
  changingCamera: {
    position: 'absolute',
    bottom: 50,
    left: '45%',
    color: '#ffffff',
  },
  constainerLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  headingContainer: {
    paddingLeft: '10%',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    height: '20%',
  },
  vaccinatorContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  yourVaccine: {
    textAlign: 'center',
    display: 'flex',
    fontSize: 10,
    borderTopColor: '#b1bb97',
    borderTopWidth: 1,
    padding: 5,
  },
});
