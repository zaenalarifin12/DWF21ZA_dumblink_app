import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import Phone1 from '../../assets/images/phone1.png';
import ViewIcon from '../../assets/icons/View.png';
import EditIcon from '../../assets/icons/Edit.png';
import DeleteIcon from '../../assets/icons/Delete.png';
import {API, url} from '../../config/api';
import Body from '../../components/Body';

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
    <Body title="MyLink" onPress={() => navigation.toggleDrawer()}>
      <View style={styles.body}>
        <ScrollView>
          {links != null ? (
            links.map(link => {
              return (
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    marginHorizontal: 30,
                    borderRadius: 25,
                  }}>
                  <Image
                    style={{
                      margin: 10,
                      width: '100%',
                      height: 200,
                      borderRadius: 20
                    }}
                    source={{uri: link.image}}
                    resizeMode="contain"
                  />
                  <View>
                    <Text style={{textAlign: 'center'}}>{link.title}</Text>
                    <Text
                      style={{
                        color: '#7E7A7A',
                        textAlign: 'center',
                        flexWrap: 'wrap',
                      }}>{`${url}/${link.uniqueLink}`}</Text>
                  </View>

                  <View
                    style={{
                      width: "50%",
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
    </Body>
  );
}

export default MyLink;
const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 20,
    paddingTop: 10,
    justifyContent: 'space-between',
  },
  image: {
    width: '100%',
  },
});
