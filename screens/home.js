import React, {useState, useMemo, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  StatusBar,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {TextInput, FlatList} from 'react-native-gesture-handler';

const user = auth().currentUser;
const db = firestore().collection(user.uid);

const HomeScreen = () => {
  const [todo, setTodo] = useState('');
  const [list, setList] = useState([]);
  const [edit, setEdit] = useState(null);
  const [text, setText] = useState('');

  const saveTodo = async () => {
    Keyboard.dismiss();
    if (todo === '') {
      console.log('Empty Input...!!!');
      return;
    }
    // logging data.
    console.log(todo);
    await db.add({todo}).catch(err => {
      console.log(err.toString());
    });
    setTodo('');
  };

  const updateTodo = async () => {
    Keyboard.dismiss();
    if (text === '') {
      console.log('Empty Input...!!!');
      return;
    }
    console.log(text);
    await db.doc(list[edit].id).set({
      todo: text,
    });
    setText('');
    setEdit(null);
  };

  useEffect(() => {
    let fetch = async () => {
      await db
        .get()
        .then(snapshot => {
          let result = [];
          snapshot.forEach(v => {
            result.push(v);
          });
          setList(result);
        })
        .catch(err => {
          console.log(err.toString());
        });
    };
    fetch();
  }, []);

  console.log(list);

  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle="dark-content" />
      <View
        style={{
          alignItems: 'flex-start',
          flexDirection: 'row',
          justifyContent: 'center',
          marginBottom: 10,
        }}>
        <TextInput
          placeholder="Enter To-do"
          autoCorrect={false}
          autoCapitalize="none"
          blurOnSubmit
          keyboardType="default"
          placeholderTextColor="#616161"
          style={styles.input}
          onChangeText={edit === null ? setTodo : setText}
          value={edit === null ? todo : text}
        />
        <View style={styles.button}>
          <Button
            title="Save"
            color="#009688"
            onPress={edit === null ? saveTodo : updateTodo}
          />
        </View>
      </View>
      <FlatList
        data={list}
        keyExtractor={(item, index) => index + ''}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setEdit(index);
                setText(item.data().todo);
              }}>
              <Text>{item.data().todo}</Text>
            </TouchableOpacity>
          );
        }}
        style={{
          flex: 1,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 30,
    borderWidth: 1,
    width: 250,
    padding: 5,
    margin: 10,
  },
  button: {
    marginHorizontal: 10,
    marginTop: 7,
  },
});

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

  return {
    title: 'Home Screen',
    headerStyle: {
      backgroundColor: '#009688',
    },
    headerRight: (
      <TouchableOpacity onPress={Logout}>
        <Text style={{marginRight: 15}}>Logout</Text>
      </TouchableOpacity>
    ),
  };
};

export default HomeScreen;
