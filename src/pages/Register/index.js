import React, {useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {API, setAuthToken} from '../../config/api';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonRectangle from '../../components/ButtonRectangle';
import InputTextCustom from '../../components/InputTextCustom';

function Register({navigation}) {
  // initial data
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const body = {
        email,
        name,
        password,
      };
      console.log(body);
      const response = await API.post(`/register`, body)
        .then(async success => {
          console.log(success);
          await AsyncStorage.setItem('token', success.data.data.user.token);
          setAuthToken(success.data.data.user.token);
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
          <Image
            source={require('../../assets/icons/logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
          <Text style={styles.title}>Register</Text>
        </View>
        <View style={styles.body}>
          <InputTextCustom onChangeText={setName} value={name} name={'Name'} />
          <InputTextCustom
            onChangeText={setEmail}
            value={email}
            name={'Email'}
          />
          <InputTextCustom
            onChangeText={setPassword}
            value={password}
            name={'Password'}
            type={'password'}
          />

          <ButtonRectangle
            title={'Register'}
            onPress={() => handleRegister()}
          />
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
  },
  header: {
    paddingTop: 84,
    paddingBottom: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFF',
    borderBottomEndRadius: 55,
    borderBottomStartRadius: 55,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  title: {
    fontSize: 28,
  },

  body: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },

  link: {
    fontSize: 18,
  },
  textLink: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoImage: {
    width: 120,
  },
});
