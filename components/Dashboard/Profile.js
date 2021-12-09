import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {
  Avatar,
  Caption,
  Headline,
  Subheading,
  Button,
} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import MIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {toCapitalized} from './../../reusable/';
import {vaccinatedAndSchedule} from '../../redux/actions/schedule.actions';
const Profile = props => {
  const {container} = styles;
  const {user} = useSelector(state => state.auth);
  const {vaccinated} = useSelector(state => state.schedule);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(vaccinatedAndSchedule({vaccinator: user._id}));
    return () => {
      dispatch(vaccinatedAndSchedule({vaccinator: user._id}));
    };
  }, []);

  return (
    <View style={container}>
      <View style={styles.backgroundContainer}>
        <TouchableOpacity onPress={() => props.navigation.navigate('Home')}>
          <MIcons size={34} name="arrow-left" />
        </TouchableOpacity>

        <View style={styles.profileContainer}>
          <Avatar.Image
            resizeMode="cover"
            size={130}
            source={{
              uri: user
                ? user.profile.url
                : require('./../../assets/icons/background.jpg'),
            }}
          />
          {/* <TouchableOpacity style={styles.edit}>
            <Feather name="edit" size={25} />
          </TouchableOpacity> */}
        </View>
        <Headline style={styles.headName}>
          {user
            ? toCapitalized(
                `${user.firstname} ${user.middlename} ${user.lastname}`,
              )
            : ''}
        </Headline>
        <View style={styles.headingInformation}>
          <View style={{width: '50%'}}>
            <Caption style={{...styles.text_center}}>Vaccinated By You</Caption>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('vac_by_u')}>
              <Subheading style={styles.subheading}>
                {vaccinated ? vaccinated.TotalVaccinatedByYou : '0'}
              </Subheading>
            </TouchableOpacity>
          </View>
          <View style={{width: '50%'}}>
            <Caption style={{...styles.text_center}}>Since</Caption>
            <Subheading style={styles.subheading}>
              {user ? new Date(user.createdAt).getFullYear() : '2017'}
            </Subheading>
          </View>
        </View>
      </View>

      {user ? (
        <View style={styles.informationContainer}>
          <View style={{display: 'flex', flexDirection: 'row', padding: 20}}>
            <MIcons size={35} color="#0AC8E2" name="gmail" />
            <Caption style={styles.informationText}>{user.email}</Caption>
          </View>
          <View style={{display: 'flex', flexDirection: 'row', padding: 20}}>
            <Feather size={35} color="#0AC8E2" name="smartphone" />
            <Caption style={styles.informationText}>{user.contact}</Caption>
          </View>
          <View style={{display: 'flex', flexDirection: 'row', padding: 20}}>
            <AntDesign size={35} color="#0AC8E2" name="infocirlceo" />
            <Caption style={styles.informationText}>{user.civilStatus}</Caption>
          </View>
          <View style={{display: 'flex', flexDirection: 'row', padding: 20}}>
            <Fontisto size={35} color="#0AC8E2" name="intersex" />
            <Caption style={styles.informationText}>{user.sex}</Caption>
          </View>
        </View>
      ) : null}
    </View>
  );
};
export default Profile;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    height: '100%',
  },
  backgroundContainer: {
    width: '100%',
    position: 'relative',
    height: 250,
    backgroundColor: '#25bbf7',
  },
  headName: {
    display: 'flex',
    justifySelf: 'center',
    alignSelf: 'center',
    fontWeight: '800',
    color: '#ffffff',
    marginTop: 120,
  },
  profileContainer: {
    position: 'absolute',
    left: '38%',
    top: '10%',
    width: 120,
    height: 120,
    borderRadius: 120 / 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    elevation: 1,
  },

  icons: {
    position: 'absolute',
    right: 10,
    top: '50%',
    color: '#2BC4E0',
  },
  headingInformation: {
    display: 'flex',
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-between',
    alignItems: 'center',
    justifySelf: 'center',
    alignSelf: 'center',
    height: 80,
    padding: 10,
    elevation: 2,
    borderColor: 'black',
    position: 'absolute',
    backgroundColor: '#ffffff',
    bottom: -30,
  },
  text_center: {
    textAlign: 'center',
  },
  subheading: {
    color: '#0AC8E2',
    textAlign: 'center',
  },
  informationContainer: {
    width: '90%',
    display: 'flex',
    justifySelf: 'center',
    alignSelf: 'center',
    padding: 20,
  },
  informationText: {
    marginLeft: 15,
    fontSize: 15,
    marginTop: 8,
    color: 'black',
    fontWeight: '600',
  },
  edit: {
    position: 'absolute',
    right: 2,
    bottom: 5,
    backgroundColor: '#ffffff',
    borderRadius: 4,
    borderColor: '#fdab8a',
    borderWidth: 0.5,
  },
});
