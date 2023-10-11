import { Dimensions, StyleSheet } from 'react-native';
export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

export const stylesSet = StyleSheet.create({
  container: {
    flex: 1,
  },
});
