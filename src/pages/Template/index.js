import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import Phone1 from '../../assets/images/phone1.png';
import Phone2 from '../../assets/images/phone2.png';
import Phone3 from '../../assets/images/phone3.png';
import Phone4 from '../../assets/images/phone4.png';

function Template({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Text>Menu</Text>
        </TouchableOpacity>
        <Text>Template</Text>
      </View>
      <View style={styles.body}>
        <ScrollView>
          <TouchableOpacity
            onPress={() => navigation.navigate('AddTemplate', {id: 1})}>
            <Image source={Phone1} style={styles.image} resizeMode="contain" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('AddTemplate', {id: 2})}>
            <Image source={Phone2} style={styles.image} resizeMode="contain" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('AddTemplate', {id: 3})}>
            <Image source={Phone3} style={styles.image} resizeMode="contain" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('AddTemplate', {id: 4})}>
            <Image source={Phone4} style={styles.image} resizeMode="contain" />
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}

export default Template;
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
  image: {
    width: '100%',
  },
});
