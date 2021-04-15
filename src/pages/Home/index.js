import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

import ButtonRadiusCircle from '../../components/ButtonRadiusCircle';
function Home({navigation}) {
  return (
    <>
      <View style={{flex: 1, backgroundColor: '#FF9F00'}}>
        <View style={styles.header}>
          <Image
            source={require('../../assets/icons/logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.body}>
          <Image
            source={require('../../assets/images/phone1.png')}
            style={styles.image}
            resizeMode="contain"
          />
          <View>
            <ButtonRadiusCircle
              title="Login"
              onPress={() => navigation.navigate('Login')}
              color={'white'}
            />
            <ButtonRadiusCircle
              title="Register"
              onPress={() => navigation.navigate('Register')}
              color={'white'}
            />
          </View>
        </View>
      </View>
    </>
  );
}

export default Home;

const styles = StyleSheet.create({
  header: {
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#FFFF',
    borderBottomStartRadius: 50,
  },
  logoImage: {
    width: 150,
  },
  body: {
    flex: 1,
    borderTopEndRadius: 55,
    paddingHorizontal: 50,
    paddingVertical: 40,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  wrapperButton: {
    width: '40%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonLogin: {
    color: 'black',
  },
  buttonRegister: {
    backgroundColor: '#FF9F00',
    color: '#FFFF',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
  },
  image: {
    width: 'auto',
    height: 300,
  },
});
