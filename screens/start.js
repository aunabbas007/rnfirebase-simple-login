import React, {useEffect} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import auth from '@react-native-firebase/auth';

const StartScreen = props => {
  useEffect(() => {
    if (auth().currentUser !== null) {
      console.log('User is logged in');
      console.log(auth().currentUser.email);
      props.navigation.navigate('Home');
    } else {
      props.navigation.navigate('Login');
    }
  });

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Start Screen</Text>
      <ActivityIndicator size="small" />
    </View>
  );
};

export default StartScreen;
