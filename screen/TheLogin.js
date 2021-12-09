import React, {useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  Title,
  Text,
  Provider,
  ActivityIndicator,
  Caption,
} from 'react-native-paper';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import Io from 'react-native-vector-icons/Ionicons';
import RNSystemSounds from '@dashdoc/react-native-system-sounds';
import {useDispatch, useSelector} from 'react-redux';
import {LoginVaccinator} from '../redux/actions/auth.actions';
const {width} = Dimensions.get('window');
const TheLogin = props => {
  const {authenticating} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [cameraView, setCameraView] = useState(false);

  const ifScanneed = e => {
    RNSystemSounds.beep();
    const vaccinator_id = typeof e == 'object' ? e.data : e;

    dispatch(LoginVaccinator({_id: vaccinator_id}));
  };

  return (
    <Provider>
      {authenticating ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator animating={true} size={90} color={'#ffd700'} />
          <Caption>Authenticating...</Caption>
        </View>
      ) : (
        <KeyboardAvoidingView
          style={{
            flex: 1,
            margin: 0,
            padding: 0,
            width: '100%',
            height: '100%',
          }}>
          <ImageBackground
            source={require('./../assets/icons/loginContainer.jpg')}
            style={styles.imgBackground}>
            <View style={styles.boxLogin}>
              <View style={styles.circleBox}>
                <Image
                  source={require('./../assets/icons/logo.png')}
                  style={styles.imgStyle}
                />
                <Title style={styles.tstyle}>Vaccinator QRCODE</Title>
              </View>

              <View style={styles.qrcode_container}>
                <QRCodeScanner
                  containerStyle={{
                    backgroundColor: '#009387',
                    height: '100%',
                    position: 'relative',
                  }}
                  cameraProps={{
                    autoFocus: RNCamera.Constants.AutoFocus.on,
                  }}
                  onRead={ifScanneed}
                  permissionDialogMessage="Need Permission To Access Camera"
                  reactivate={!authenticating}
                  reactivateTimeout={1500}
                  showMarker={true}
                  fadeIn={true}
                  cameraType={cameraView ? 'back' : 'front'}
                  cameraStyle={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                  }}
                  markerStyle={{borderColor: '#fff', borderRadius: 10}}
                  bottomContent={
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        bottom: 10,
                        left: '35%',
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={() => {
                        setCameraView(!cameraView);
                      }}>
                      <Text
                        style={{
                          fontSize: 21,
                          color: 'white',
                        }}>
                        <Io
                          name="camera-reverse-outline"
                          color={'white'}
                          size={30}
                        />{' '}
                      </Text>
                    </TouchableOpacity>
                  }
                />
              </View>
            </View>
          </ImageBackground>
        </KeyboardAvoidingView>
      )}
    </Provider>
  );
};
export default TheLogin;
const styles = StyleSheet.create({
  imgBackground: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    height: '100%',
  },
  boxLogin: {
    width: '90%',
    height: 500,
    backgroundColor: '#ffffff',
    borderRadius: 4,
    shadowColor: '#e4eeed',
    position: 'relative',
    opacity: 0.9,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgBackground: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  circleBox: {
    padding: 10,
    position: 'absolute',
    top: -50,
    left: '30%',
    width: 150,
    height: 150,
    backgroundColor: '#ffffff',
    borderRadius: 150 / 2,
    shadowColor: '#e4eeed',
    elevation: 40,
  },
  tstyle: {
    marginTop: 20,
    display: 'flex',
    alignSelf: 'center',
    fontSize: 15,
    textAlign: 'center',
    width: width,

    letterSpacing: 5,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#fdab8a',
  },
  imgStyle: {
    width: 130,
    height: 130,
    borderRadius: 130 / 2,
  },
  qrcode_container: {
    borderWidth: 0.5,
    borderColor: '#3b3a39',
    width: '90%',
    height: 400,

    position: 'relative',
    overflow: 'hidden',
    marginTop: 60,
  },
});
