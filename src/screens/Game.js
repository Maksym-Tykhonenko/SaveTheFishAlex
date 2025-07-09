import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LargeGradientBtn from '../components/LargeGradientBtn';
import { useState } from 'react';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

import Background from '../components/Background';
import Header from '../components/Header';

const { height } = Dimensions.get('window');

const Game = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const handleStartGame = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate('CatcherGame');
    }, 4000);
  };

  return (
    <Background>
      <Header title={'Mini-game'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {isLoading ? (
            <View style={{ marginTop: height * 0.19 }}>
              <LottieView
                source={require('../assets/animations/earth.json')}
                autoPlay
                style={{ width: 196, height: 199 }}
              />
            </View>
          ) : (
            <View>
              <Image
                source={require('../assets/images/facts.png')}
                style={styles.image}
              />
              <View style={{ paddingHorizontal: 28 }}>
                <Text style={styles.title}>Clean the ocean, save the fish</Text>
                <LargeGradientBtn
                  title={'Start game'}
                  onPress={handleStartGame}
                />
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: { paddingBottom: height * 0.16, alignSelf: 'center' },
  image: {
    height: 395,
    width: '100%',
  },
  title: {
    fontFamily: Platform.OS === 'ios' ? 'Nerko One' : 'Nerko',
    fontSize: 26,
    color: '#fff',
    marginBottom: 17,
    textAlign: 'center',
    marginTop: 14,
  },
});

export default Game;
