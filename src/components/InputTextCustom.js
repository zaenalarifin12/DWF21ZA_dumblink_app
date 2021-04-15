import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

export default function InputTextCustom({
  onChangeText,
  value,
  name,
  type = '',
}) {
  return (
    <>
      {type == 'password' ? (
        <TextInput
          onChangeText={onChangeText}
          value={value}
          placeholder={name}
          secureTextEntry
          style={styles.form}
        />
      ) : (
        <TextInput
          onChangeText={onChangeText}
          value={value}
          placeholder={name}
          style={styles.form}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
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
});
