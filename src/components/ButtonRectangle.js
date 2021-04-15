import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function ButtonRectangle({title, onPress}) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.button}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    fontSize: 18,
    width: '100%',
    backgroundColor: '#FF9F00',
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: '#FFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    borderRadius: 5,
  },
  
});
