import React, {useState} from 'react';
import * as ImagePicker from 'react-native-image-picker';
import {
  PermissionsAndroid,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  const [image, setImage] = useState({
    data: '',
    uri: '',
  });

  const options = {
    mediaType: 'photo',
    includeBase64: true,
    quality: 0.5,
    maxWidth: 900,
    maxHeight: 900,
  };

  const renderFileData = () => {
    if (image.data) {
      return (
        <Image
          source={{uri: 'data:image/jpeg;base64,' + image.data}}
          style={styles.images}
        />
      );
    } else {
      return (
        <Image source={require('./assets/dummy.png')} style={styles.images} />
      );
    }
  };

  const renderFileUri = () => {
    if (image.uri) {
      return <Image source={{uri: image.uri}} style={styles.images} />;
    } else {
      return (
        <Image
          source={require('./assets/galeryImages.jpg')}
          style={styles.images}
        />
      );
    }
  };

  const launchCamera = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Awesome Camera',
          message:
            'AWESOME CAMERA PRECISA DE PERMISSÃO PARA ACESSAR SUAS FOTOS ',
          buttonNeutral: 'Perguntar depois',
          buttonNegative: 'Cancelar',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        ImagePicker.launchCamera(options, response => {
          setImage({
            data: response.base64,
            uri: response.uri,
          });
        });
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const launchImageLibrary = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Awesome Camera',
          message:
            'AWESOME CAMERA PRECISA DE PERMISSÃO PARA ACESSAR SUAS FOTOS ',
          buttonNeutral: 'Perguntar depois',
          buttonNegative: 'Cancelar',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        ImagePicker.launchImageLibrary(options, response => {
          setImage({
            data: response.base64,
            uri: response.uri,
          });
        });
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <View>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.body}>
          <Text style={{textAlign: 'center', fontSize: 20, paddingBottom: 10}}>
            Imagens da câmera e da galeria
          </Text>
          <View style={styles.ImageSections}>
            <View>
              {renderFileData()}
              <Text style={{textAlign: 'center'}}>Base 64 String</Text>
            </View>
            <View>
              {renderFileUri()}
              <Text style={{textAlign: 'center'}}>Arquivo Uri</Text>
            </View>
          </View>

          <View style={styles.btnParentSection}>
            <TouchableOpacity
              onPress={() => launchCamera()}
              style={styles.btnSection}>
              <Text style={styles.btnText}>Acessar câmera</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => launchImageLibrary()}
              style={styles.btnSection}>
              <Text style={styles.btnText}>Acessar galeria de fotos</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },

  body: {
    backgroundColor: Colors.white,
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
    height: Dimensions.get('screen').height - 20,
    width: Dimensions.get('screen').width,
  },
  ImageSections: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  images: {
    width: 150,
    height: 150,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3,
  },
  btnParentSection: {
    alignItems: 'center',
    marginTop: 10,
  },
  btnSection: {
    width: 225,
    height: 50,
    backgroundColor: '#DCDCDC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginBottom: 10,
  },
  btnText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default App;
