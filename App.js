import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker'

import Button from './components/Button';
import IconButton from './components/IconButton';
import ImageViewer from './components/ImageViewer';
import CircleButton from './components/CircleButton';
import EmojiPicker from './components/EmojiPicker';
import EmojiList from './components/EmojiList';



export default function App() {

  const [pickedEmoji, setPickedEmoji] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [imgDimensions, setImgDimensions] = useState({ width: 300, height: 300 });
  const [homeOpacity, setHomeOpacity] = useState(1);

  const PlaceholderImage = require('./assets/placeholder.jpg');

  const onReset = () => {
    setShowAppOptions(false);
    setSelectedImage(PlaceholderImage)
  };

  const onAddSticker = () => {
    setHomeOpacity(0.5);
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setHomeOpacity(1);
    setIsModalVisible(false);
  };

  const onSaveImageAsync = async () => {
    // we will implement this later
  };

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setImgDimensions({
        width: result.assets[0].width,
        height: result.assets[0].height,
      });
      setShowAppOptions(true);
    } else {
      alert('You did not select any image')
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      opacity: homeOpacity,
    },
    imageContainer: {
      flex: 1,
      paddingTop: 58,
    },
    image: {
      width: imgDimensions.width,
      height: imgDimensions.height,
      borderRadius: 18,
    },
    optionsContainer: {
      position: 'absolute',
      bottom: 40,
    },
    optionsRow: {
      alignItems: 'center',
      flexDirection: 'row',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer
          placeholderImageSource={PlaceholderImage}
          selectedImage={selectedImage}
          size={imgDimensions}
        />
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
          <Button label="Use this photo" onPress={() => setShowAppOptions(true)} />
        </View>
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
      <StatusBar style="auto" />
    </View>
  );
}
