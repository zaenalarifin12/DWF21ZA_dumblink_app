import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';

function Body({children, title, onPress, titleMenu = ''}) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onPress}>
          <Text>{titleMenu == 'back' ? 'Back' : 'Menu'}</Text>
        </TouchableOpacity>
        <Image
          source={require('../assets/icons/logo.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
        <Text>{title}</Text>
      </View>
      <View style={styles.body}>{children}</View>
    </View>
  );
}

export default Body;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF9F00',
  },
  header: {
    paddingHorizontal: 20,
    borderBottomRightRadius: 25,
    borderBottomStartRadius: 25,
    backgroundColor: 'white',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logoImage: {
    width: 150,
  },
  body: {
    flex: 1,
    marginTop: 20,
  },
});
