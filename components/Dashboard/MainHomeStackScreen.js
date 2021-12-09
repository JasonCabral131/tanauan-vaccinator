import React from 'react';
import {
  RefreshControl,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  Card,
  Avatar,
  Caption,
  Subheading,
  Button,
  Headline,
} from 'react-native-paper';
import MIcons from 'react-native-vector-icons/MaterialIcons';
import {
  getScheduleToday,
  vaccinatedAndSchedule,
} from '../../redux/actions/schedule.actions';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {toCapitalized} from '../../reusable';

const LeftContent = props => <Fontisto {...props} name="injection-syringe" />;
const HomeScreen = props => {
  const {container} = styles;
  const {user} = useSelector(state => state.auth);
  const {todaySchedule} = useSelector(state => state.schedule);
  const {vaccinated} = useSelector(state => state.schedule);
  const [refreshing, setRefreshing] = React.useState(false);
  const dispatch = useDispatch();
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    dispatch(vaccinatedAndSchedule({vaccinator: user._id}));
    await dispatch(getScheduleToday());
    setRefreshing(false);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Card style={styles.cardContainer}>
          <Card.Title
            title="Todays Vaccine Schedule"
            subtitle={
              todaySchedule
                ? todaySchedule.vaccineType
                  ? toCapitalized(todaySchedule.vaccineType.vaccineName)
                  : 'No Schedule For Today'
                : 'No Schedule For Today'
            }
            left={LeftContent}
          />
          <Caption style={{textAlign: 'center'}}>
            {todaySchedule
              ? todaySchedule.vaccineType
                ? 'Vaccine Stock '
                : null
              : null}
            <Subheading>
              {todaySchedule ? todaySchedule.vaccineType?.vaccineStock : '0'}
            </Subheading>
          </Caption>
        </Card>
        <Card style={styles.cardContainer}>
          <Card.Title
            title="Vaccinated Person"
            left={props => <MIcons {...props} name="person-pin" />}
          />
          <Headline style={{textAlign: 'center'}}>
            {vaccinated ? vaccinated.totalVaccinated : 0}
          </Headline>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#ffffff',
    width: '100%',
    padding: 10,
  },
  cardContainer: {
    width: '100%',
    elevation: 3,
    marginTop: 3,
  },
});
