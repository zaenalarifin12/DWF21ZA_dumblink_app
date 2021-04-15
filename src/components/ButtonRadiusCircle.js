import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function ButtonRadiusCircle({title, onPress, color}) {
  return (
    <TouchableOpacity style={styles.button(color)} onPress={onPress}>
      <Text style={{fontSize: 18, fontWeight: 'bold'}}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: color => ({
    backgroundColor: color == 'white' ? 'white' : '#FF9F00',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,

    borderRadius: 20,
    marginVertical: 10,
  }),
});
