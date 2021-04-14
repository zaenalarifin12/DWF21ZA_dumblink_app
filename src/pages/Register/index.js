import React, {useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {API, setAuthToken} from '../../config/api';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
function Register({navigation}) {
  // initial data
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const body = {
        email,
        name,
        password,
      };
      console.log(body);
      const response = await API
        .post(`/register`, body)
        .then(async success => {
          await AsyncStorage.setItem('token', success.data.data.user.token);
          setAuthToken(success.data.data.user.token)
          navigation.navigate('MainApp');
        })
        .catch(err => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Register</Text>
        </View>
        <View style={styles.body}>
          <TextInput
            onChangeText={setName}
            value={name}
            placeholder="Name"
            style={styles.form}
          />
          <TextInput
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
            style={styles.form}
          />
          <TextInput
            onChangeText={setPassword}
            value={password}
            secureTextEntry
            placeholder="Password"
            style={styles.form}
          />
          <TouchableOpacity onPress={handleLogin}>
            <Text style={styles.button}>Register</Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text style={styles.link}>Already have an account ? Klik </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.textLink}>Here</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFF',
    paddingTop: 124,
    paddingHorizontal: 20,
  },
  header: {
    paddingBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
  },

  body: {
    flex: 1,
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
  link: {
    fontSize: 18,
  },
  textLink: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
