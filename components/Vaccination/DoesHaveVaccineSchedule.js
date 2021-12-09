import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Headline} from 'react-native-paper';
import MIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const DoesNotHaveVaccinationSchedule = props => {
  const {container} = styles;
  return (
    <View style={container}>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('Home')}
        style={styles.backhome}>
        <MIcons size={34} name="arrow-left" />
      </TouchableOpacity>
      <Headline style={{color: '#f72a66', textAlign: 'center', width: '80%'}}>
        No Vaccine Schedule For Today
      </Headline>
      <Image
        source={require('./../../assets/icons/noVaccine.jpg')}
        style={{width: '70%', height: 200}}
      />
    </View>
  );
};
export default DoesNotHaveVaccinationSchedule;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#ffffff',
  },
  backhome: {
    position: 'absolute',
    top: 2,
    left: 10,
  },
});
