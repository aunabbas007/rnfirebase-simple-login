import React from 'react';
import {View, Text, Button, StatusBar, StyleSheet, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';

const HomeScreen = props => {
  const Logout = async () => {
    console.log('Logout Pressed');
    /* firebase's signOut function doesn't return anything,
    so use .then() method istead if/else */
    try {
      auth()
        .signOut()
        .then(props.navigation.navigate('Login'));
    } catch (error) {
      Alert.alert('Error', error.toString());
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.statusBar}>
        <Text
          style={{
            color: 'white',
            fontSize: 22,
            fontWeight: 'bold',
            marginBottom: -40,
          }}>
          Home Screen
        </Text>
      </View>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Home Screen</Text>
        <Button style={styles.button} title="Logout" onPress={Logout} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    height: 90,
    backgroundColor: '#0086ad',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginHorizontal: 35,
    marginTop: 10,
  },
});

export default HomeScreen;
