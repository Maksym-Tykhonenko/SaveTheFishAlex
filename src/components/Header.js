import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { height } = Dimensions.get('window');

export default function Header({ title, headerStyles, goBack }) {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={['#005B9E', '#00376B']}
      style={styles.contentContainer}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      {goBack && (
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.back}
          onPress={() => navigation.goBack()}
        >
          <Image source={require('../assets/icons/back.png')} />
        </TouchableOpacity>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
    width: '100%',
  },
  headerContainer: {
    paddingTop: height * 0.09,
    paddingHorizontal: 41,
    paddingBottom: 26,
    borderWidth: 0.17,
    borderBottomWidth: 2,
    borderColor: '#F26801',
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
  },
  headerTitle: {
    fontFamily: Platform.OS === 'ios' ? 'Nerko One' : 'Nerko',
    fontSize: 26,
    textAlign: 'center',
    color: '#fff',
  },
  back: {
    position: 'absolute',
    top: height * 0.097,
    left: 41,
  },
});
