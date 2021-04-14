import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {TouchableOpacity, TextInput} from 'react-native-gesture-handler';
import {API} from '../../config/api';

function MyAccount({navigation}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const getUser = async () => {
    try {
      await API.get('/check-auth')
        .then(success => {
          setName(success.data.data.user.name);
          setEmail(success.data.data.user.email);
        })
        .catch(err => {
          console.log(err);
        });
    } catch (error) {}
  };

  const deleteUser = async () => {
    try {
      await API.delete('/user')
        .then(async s => {
          await AsyncStorage.clear();

          navigation.reset({
            index: 0,
            routes: [{name: 'Register'}],
          });
        })
        .catch(err => {
          console.log(err);
        });
    } catch (error) {}
  };

  const updateUser = async () => {
    try {
      const body = {
        name: name,
        password: password,
      };

      await API.put('/user', body)
        .then(success => {
          console.log(success);
        })
        .catch(err => {
          console.log(err);
        });
    } catch (error) {}
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Text style={styles.buttonBack}>Back</Text>
        </TouchableOpacity>
        <Text>My Account</Text>
      </View>
      <View style={styles.body}>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Name"
          style={styles.form}
        />
        <TextInput
          value={email}
          placeholder="Email"
          style={styles.formDisable}
          editable={false}
          selectTextOnFocus={false}
        />
        <TextInput
          onChangeText={setPassword}
          value={password}
          secureTextEntry
          placeholder="Password (isi jika ingin mengganti)"
          style={styles.form}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity onPress={() => updateUser()}>
            <Text style={styles.button}>Save Account</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => deleteUser()}>
            <Text style={styles.buttondanger}>Delete Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default MyAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  body: {
    paddingTop: 10,
  },
  form: {
    width: '100%',
    backgroundColor: '#E5E5E5',
    color: 'black',
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 20,
    marginVertical: 10,
    height: 50,
    borderRadius: 5,
    borderColor: 'black',
  },
  formDisable: {
    width: '100%',
    backgroundColor: '#d8e3e7',
    color: 'black',
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 20,
    marginVertical: 10,
    height: 50,
    borderRadius: 5,
    borderColor: 'black',
  },
  button: {
    fontSize: 18,
    marginVertical: 10,
    width: '100%',
    backgroundColor: '#FF9F00',
    paddingHorizontal: 10,
    paddingVertical: 13,
    color: '#FFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    borderRadius: 5,
  },
  buttondanger: {
    fontSize: 18,
    marginVertical: 10,
    width: '100%',
    backgroundColor: '#FF0000',
    paddingHorizontal: 10,
    paddingVertical: 13,
    color: '#FFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    borderRadius: 5,
  },
  image: {
    width: '100%',
  },
  buttonBack: {
    color: '#FFFF',
    fontSize: 18,
    backgroundColor: '#FF9F00',
    padding: 5,
    borderRadius: 5,
    textAlign: 'center',
  },
});
