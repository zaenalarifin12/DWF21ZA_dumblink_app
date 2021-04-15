import React, {useState, useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {API, url} from '../../config/api';

export default function DetailLink({route, navigation}) {
  const [link, setLink] = useState(null);

  const getLink = async () => {
    try {
      const {uniqueLink} = route.params;
      await API.get(`/link/show/${uniqueLink}`)
        .then(s => {
          setLink(s.data.data.link);
        })
        .catch(err => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLink();
  }, []);

  return (
    <View>
      {link != null ? (
        <>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: 20,
            }}>
            <Image
              style={{
                width: 200,
                height: 200,
                borderRadius: 50,
              }}
              source={{uri: url + '/uploads/' + link.image}}
              resizeMode="contain"
            />
          </View>

          <Text style={{textAlign: 'center', fontSize: 24}}>{link.title}</Text>
          <Text style={{textAlign: 'center', fontSize: 18}}>
            {link.description}
          </Text>
          {link.links.map(l => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: 20,
                  marginHorizontal: 20,
                  padding: 5,
                  backgroundColor: 'black',
                  paddingHorizontal: 40,
                  paddingLeft: 50,
                  alignItems: 'center',
                  height: 70
                }}>
                <Image
                  source={{uri: url + '/uploads/' + l.image}}
                  style={{width: 50, height: 50, borderRadius: 50}}
                />
                <Text style={{color: 'white', marginLeft: 20}}>{l.title}</Text>
              </View>
            );
          })}
        </>
      ) : (
        <Text>Kosong</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
