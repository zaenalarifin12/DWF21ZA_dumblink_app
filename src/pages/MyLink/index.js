import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import Phone1 from '../../assets/images/phone1.png';
import ViewIcon from '../../assets/icons/View.png';
import EditIcon from '../../assets/icons/Edit.png';
import DeleteIcon from '../../assets/icons/Delete.png';
import {API, url} from '../../config/api';

function MyLink({navigation}) {
  const [links, setLinks] = useState(null);

  const getAllLink = async () => {
    await API.get('/links')
      .then(s => {
        setLinks(s.data.data.links);
        console.log(s.data.data.links);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const deleteLink = async uniqueLink => {
    try {
      console.log(id);
      await API.delete(`/link/${uniqueLink}`)
        .then(s => {
          getAllLink();
        })
        .catch(e => {});
    } catch (error) {}
  };

  useEffect(() => {
    getAllLink();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Text>Menu</Text>
        </TouchableOpacity>
        <Text>My Link</Text>
      </View>
      <View style={styles.body}>
        <ScrollView>
          {links != null ? (
            links.map(link => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Image
                    style={{
                      width: 100,
                      height: 100,
                    }}
                    source={{uri: link.image}}
                    resizeMode="contain"
                  />
                  <View>
                    <Text>{link.title}</Text>
                    <Text
                      style={{
                        color: '#7E7A7A',
                        flexWrap: 'wrap',
                        maxWidth: 100,
                      }}>{`${url}/${link.uniqueLink}`}</Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('DetailLink', {
                          uniqueLink: link.uniqueLink,
                        })
                      }>
                      <Image
                        resizeMode="contain"
                        style={{width: 30}}
                        source={ViewIcon}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Image
                        resizeMode="contain"
                        style={{width: 30}}
                        source={EditIcon}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => deleteLink(link.uniqueLink)}>
                      <Image
                        resizeMode="contain"
                        style={{width: 30}}
                        source={DeleteIcon}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })
          ) : (
            <Text>Kosong</Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

export default MyLink;
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
    justifyContent: 'space-between',
  },
  image: {
    width: '100%',
  },
});
