import { StyleSheet, Image } from 'react-native';

export default function ImageViewer({ placeholderImageSource, selectedImage, size }) {

  const styles = StyleSheet.create({
    image: {
      width: size.width % 10 > 300 ? (size.width % 10) : (300),
      height: size.height % 10 > 300 ? (size.height % 10) : (300),
      borderRadius: 9999,
    },
  });

  const imageSource = selectedImage  ? { uri: selectedImage } : placeholderImageSource;

  return <Image source={imageSource} style={styles.image} />;
}


