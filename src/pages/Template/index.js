import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {withTheme} from 'react-native-elements';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import Phone1 from '../../assets/images/phone1.png';
import Phone2 from '../../assets/images/phone2.png';
import Phone3 from '../../assets/images/phone3.png';
import Phone4 from '../../assets/images/phone4.png';
import Body from '../../components/Body';

function Template({navigation}) {
  return (
    <Body title="Template" onPress={() => navigation.toggleDrawer()}>
      <View style={{backgroundColor: '#FF9F00'}}>
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
    </Body>
  );
}

export default Template;
const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 400,
    marginVertical: 40,
  },
});
