import React from 'react';
import {
  View,
  Text,
  Button,
  StatusBar,
  Alert,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {TextInput} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-navigation';

const HomeScreen = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle="dark-content" />
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Home Screen</Text>
        <TextInput />
        <Button
          title="Save"
          onPress={() => {
            console.log('Saved Pressed...!!!');
          }}
        />
      </View>
      <View></View>
    </SafeAreaView>
  );
};

HomeScreen.navigationOptions = props => {
  const Logout = async () => {
    console.log('Logout Pressed');
    /* firebase's signOut function doesn't return anything,
    so use .then() method istead if/else */
    try {
      auth()
        .signOut()
        .then(props.navigation.replace('Login'));
    } catch (error) {
      Alert.alert('Error', error.toString());
    }
  };

  console.log(props);
  return {
    title: 'Home Screen',
    headerRight: (
      <TouchableOpacity onPress={Logout}>
        <Text style={{marginRight: 15}}>Logout</Text>
      </TouchableOpacity>
    ),
  };
};

export default HomeScreen;
