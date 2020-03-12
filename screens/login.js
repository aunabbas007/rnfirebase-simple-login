import React, {useState, useMemo} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Button,
  Text,
  Alert,
  StatusBar,
  TextInput,
  Keyboard,
} from 'react-native';
import auth from '@react-native-firebase/auth';

const LoginScreen = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signupUser = useMemo(
    () => async () => {
      Keyboard.dismiss();
      console.log(email);
      console.log(password);
      if (email === '' || password === '') {
        console.log('Email/Password is null');
        return;
      }
      try {
        // firebase takes 6 or more characters for user password.
        const a = await auth().createUserWithEmailAndPassword(email, password);
        if (a) {
          console.log('User signed up...!!!');
          Alert.alert('Success', 'Account Created, please login now');
        }
      } catch (error) {
        console.log(error);
        Alert.alert('Error', error.toString());
      }
      setEmail('');
      setPassword('');
    },
    [email, password],
  );

  const loginUser = useMemo(
    () => async () => {
      Keyboard.dismiss();
      if (email === '' || password === '') {
        console.log('Email/Password is null');
        return;
      }
      try {
        const a = await auth().signInWithEmailAndPassword(email, password);
        if (a) {
          console.log('User logged in');
          props.navigation.navigate('Home');
        }
      } catch (error) {
        console.log('Login Error');
        Alert.alert('Error', error.toString());
      }
      setEmail('');
      setPassword('');
    },
    [email, password],
  );

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
          Login Screen
        </Text>
      </View>
      <SafeAreaView
        style={{
          alignItems: 'center',
          flex: 1,
          justifyContent: 'center',
        }}>
        <Text>Login</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          placeholder="Email"
          blurOnSubmit
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          keyboardType="default"
          placeholder="Password"
          blurOnSubmit
          onChangeText={setPassword}
          value={password}
        />
        <View style={{flexDirection: 'row'}}>
          <View style={styles.button}>
            <Button title="Login" color="green" onPress={loginUser} />
          </View>
          <View style={styles.button}>
            <Button title="Signup" color="red" onPress={signupUser} />
          </View>
        </View>
      </SafeAreaView>
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
  input: {
    height: 30,
    borderBottomWidth: 1,
    width: 250,
    padding: 5,
    margin: 10,
  },
  button: {
    marginHorizontal: 35,
    marginTop: 10,
  },
});

export default LoginScreen;
