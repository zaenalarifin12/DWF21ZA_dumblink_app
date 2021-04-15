import React, {useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native-gesture-handler';
import PreviewImage from '../../assets/images/preview-image.png';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import {API} from '../../config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Body from '../../components/Body';

function AddTemplate({route, navigation}) {
  const {id} = route.params;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState('');
  const [hasImage, setHasImage] = useState(false);

  const [titleLink, setTitleLink] = useState('');
  const [urlLink, setUrlLink] = useState('');
  const [imageLink, setImageLink] = useState('');
  const [hasImageLink, setHasImageLink] = useState(false);

  const initialLink = {
    titleLink: '',
    urlLink: '',
    imageLink: '',
    hasImageLink: false,
  };

  const [links, setLinks] = useState([initialLink]);

  const listLink = [];

  const addLink = () => {
    setLinks([...links, initialLink]);
  };

  const getImage = () => {
    launchImageLibrary(
      {
        quality: 0.5,
        width: 200,
        height: 200,
      },
      response => {
        if (response.didCancel || response.errorCode) {
          console.log(response.error);
        } else {
          const source = {
            uri: response.uri,
            type: response.type,
            name: response.fileName,
          };

          setPhoto(source);
          setHasImage(true);
        }
      },
    );
  };

  const getImageLink = index => {
    launchImageLibrary(
      {
        quality: 0.5,
        width: 200,
        height: 200,
      },
      response => {
        if (response.didCancel || response.errorCode) {
          console.log(response.error);
        } else {
          const sourceLink = {
            uri: response.uri,
            type: response.type,
            name: response.fileName,
          };
          let newLink = links.map((link, sIndex) => {
            if (sIndex == index) {
              let tempLink = link;

              tempLink.imageLink = sourceLink;
              tempLink.hasImageLink = true;
              return tempLink;
            } else {
              return link;
            }
          });

          setLinks(newLink);
          // console.log(links);
        }
      },
    );
  };

  onChangeTitleLink = (index, value) => {
    let newLink = links.map((link, sIndex) => {
      if (sIndex == index) {
        let tempLink = link;
        tempLink.titleLink = value;
        return tempLink;
      } else {
        return link;
      }
    });

    setLinks(newLink);
  };

  onChangeUrlLink = (index, value) => {
    let newLink = links.map((link, sIndex) => {
      if (sIndex == index) {
        let tempLink = link;
        tempLink.urlLink = value;
        return tempLink;
      } else {
        return link;
      }
    });

    setLinks(newLink);
  };

  const handleAddLink = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      let newLinks = [];

      for (let index = 0; index < links.length; index++) {
        const bodyLink = new FormData();

        bodyLink.append('imageLink', links[index].imageLink);

        await API.post(`/imageLink`, bodyLink)
          .then(sc => {
            const thisLink = {
              ...links[index],
              imageLink: sc.data.data.image,
            };
            newLinks.push(thisLink);
          })
          .catch(err => {
            console.log(err);
          });
      }

      //////////////////////////////////////////////////////////////////////////
      let newImage = '';
      const bodyImage = new FormData();

      bodyImage.append('imageLink', photo);

      await API.post(`/imageLink`, bodyImage)
        .then(s => {
          newImage = s.data.data.image;
        })
        .catch(err => {
          console.log(err);
        });

      const body = {
        title: title,
        image: newImage,
        template: id,
        description: description,
        links: JSON.stringify(newLinks),
      };

      console.log(body);
      const response = await API.post('/link', body, config)
        .catch(err => {
          console.log(err.response);
          // if (err.response.status == 400) {
          //   settextError(err.response.data.error.message);
          //   setModalError(true);
          // }
        })
        .then(res => {
          console.log(res);
          navigation.navigate('MyLink');

          // setForm(form);
        });
    } catch (xx) {
      console.log(xx);
    }
  };

  links.map((link, index) => {
    listLink.push(
      <>
        <View
          key={index}
          style={{
            backgroundColor: '#ECECEC',
            padding: 4,
            marginVertical: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => getImageLink(index)}>
            <Image
              style={{
                width: 120,
                height: 120,
              }}
              resizeMode="contain"
              source={link.hasImageLink ? link.imageLink : PreviewImage}
            />
          </TouchableOpacity>

          <View style={{marginLeft: 20}}>
            <View>
              <Text style={styles.formTitleLink}>Title Link</Text>
              <TextInput
                onChangeText={value => onChangeTitleLink(index, value)}
                style={styles.formInputLink}
                placeholder="title"
              />
            </View>
            <View>
              <Text style={styles.formTitleLink}>Url Link</Text>
              <TextInput
                onChangeText={value => onChangeUrlLink(index, value)}
                style={styles.formInputLink}
                placeholder="urlLink"
              />
            </View>
          </View>
        </View>
      </>,
    );
  });

  return (
    <Body title="AddLink"
    titleMenu="back" onPress={() => navigation.goBack()}>
      <View
        style={{
          backgroundColor: 'white',
          borderTopStartRadius: 25,
          borderTopEndRadius: 25,
          paddingTop: 20,
          paddingHorizontal: 20,
        }}>
        <ScrollView>
          <View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={{
                  width: 150,
                  height: 150,
                }}
                resizeMode="contain"
                source={hasImage ? photo : PreviewImage}
              />
              <View style={{marginLeft: 30}}>
                <TouchableOpacity onPress={getImage}>
                  <Text style={styles.button}>Upload</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{marginTop: 10}}>
              <Text style={styles.formTitle}>Title</Text>
              <TextInput
                style={styles.formInput}
                value={title}
                onChangeText={setTitle}
                placeholder="title"
              />
            </View>
            <View style={{marginTop: 10}}>
              <Text style={styles.formTitle}>Description</Text>
              <TextInput
                value={description}
                onChangeText={setDescription}
                style={styles.formInput}
                placeholder="description"
              />
            </View>
            <View>{listLink}</View>

            <View style={{marginBottom: 30}}>
              <TouchableOpacity onPress={addLink}>
                <Text style={styles.button}>Add Link</Text>
              </TouchableOpacity>
            </View>

            <View style={{marginBottom: 100}}>
              <TouchableOpacity onPress={() => handleAddLink()}>
                <Text style={styles.button}>Publish Link</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </Body>
  );
}

export default AddTemplate;

const styles = StyleSheet.create({
  
  image: {
    width: '100%',
  },
  formTitle: {
    fontSize: 18,
    color: '#7E7A7A',
  },
  formTitleLink: {
    fontSize: 18,
  },
  formInput: {
    width: '100%',
    color: 'black',
    paddingVertical: 5,
    fontSize: 20,
    marginVertical: 10,
    height: 50,
    borderRadius: 5,
    borderColor: 'black',
    borderBottomWidth: 1,
  },
  formInputLink: {
    width: '100%',
    color: 'black',
    paddingVertical: 5,
    fontSize: 18,
    marginVertical: 10,
    borderRadius: 5,
    borderColor: 'black',
    borderBottomWidth: 1,
  },
  button: {
    color: '#FFFF',
    fontSize: 18,
    backgroundColor: '#FF9F00',
    padding: 5,
    borderRadius: 5,
    textAlign: 'center',
  },
});
