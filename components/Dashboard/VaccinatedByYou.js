import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import {Caption, DataTable, Subheading} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {toCapitalized} from './../../reusable';
import FIcons from 'react-native-vector-icons/FontAwesome';
import {View} from 'react-native-animatable';
const VaccinatedByYou = props => {
  const optionsPerPage = [20, 20, 20];
  const {container} = styles;
  const [page, setPage] = useState(0);
  const [showInformation, setShowInformation] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);
  const {vaccinated} = useSelector(state => state.schedule);
  const yourVaccinated = vaccinated ? vaccinated.yourVaccinated : [];

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);
  const getFullDate = date => {
    const dateInfo = new Date(date);

    return `${dateInfo.getMonth()} / ${dateInfo.getDate()} / ${dateInfo.getFullYear()}`;
  };

  return (
    <SafeAreaView style={container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <DataTable
          style={{
            elevation: 2,
            backgroundColor: '#ffffff',
            borderColor: '#c0c0c0',
            borderWidth: 1,
            width: '100%',
            height: '100%',
          }}>
          <DataTable.Header>
            <DataTable.Title>Name</DataTable.Title>

            <DataTable.Title numeric>Action</DataTable.Title>
          </DataTable.Header>
          {yourVaccinated.map((data, index) => {
            return (
              <>
                <DataTable.Row key={data._id}>
                  <DataTable.Cell>
                    <View style={{width: '100%'}}>
                      <Caption
                        style={{justifyContent: 'center', textAlign: 'center'}}>
                        {' '}
                        {toCapitalized(
                          `${data.user.name} ${data.user.middleName} ${data.user.lastName}`,
                        )}
                      </Caption>
                    </View>
                  </DataTable.Cell>
                  <DataTable.Cell numeric>
                    <TouchableOpacity
                      style={styles.toggleDown}
                      onPress={() => {
                        if (index + 1 === showInformation) {
                          setShowInformation(0);
                          return;
                        }
                        setShowInformation(index + 1);
                      }}>
                      <FIcons
                        size={15}
                        name={
                          showInformation === index + 1
                            ? 'chevron-up'
                            : 'chevron-down'
                        }
                      />
                    </TouchableOpacity>
                  </DataTable.Cell>
                </DataTable.Row>

                {showInformation === index + 1 ? (
                  <DataTable
                    style={{
                      elevation: 2,
                      backgroundColor: '#d5d5d7',
                      borderColor: '#c0c0c0',
                      width: '90%',
                      margin: 20,
                    }}>
                    <Caption style={{margin: 5}}>
                      Vaccine :
                      <Subheading>
                        {' '}
                        {toCapitalized(data.vaccine.vaccineName)}{' '}
                      </Subheading>
                    </Caption>
                    <DataTable.Header>
                      <DataTable.Title>Dose</DataTable.Title>
                      <DataTable.Title>Date Recieved</DataTable.Title>
                    </DataTable.Header>
                    {data.vaccinenated.map(recieved => {
                      return (
                        <DataTable.Row key={recieved._id}>
                          <DataTable.Cell>
                            {toCapitalized(`${recieved.dose}`)}
                          </DataTable.Cell>
                          <DataTable.Cell>
                            {' '}
                            {getFullDate(recieved.date)}
                          </DataTable.Cell>
                        </DataTable.Row>
                      );
                    })}
                  </DataTable>
                ) : null}
              </>
            );
          })}
        </DataTable>
      </ScrollView>
    </SafeAreaView>
  );
};
export default VaccinatedByYou;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    width: '100%',
    justifySelf: 'center',
    alignSelf: 'center',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#ffffff',
    width: '100%',
  },
  toggleDown: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
    height: 20,
    marginStart: 10,
    marginLeft: 10,
  },
});
