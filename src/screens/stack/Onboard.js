import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import Background from '../../components/Background';
import LargeGradientBtn from '../../components/LargeGradientBtn';

const { height } = Dimensions.get('window');

const Onboard = () => {
  const [index, setIndex] = useState(0);
  const navigation = useNavigation();

  const handleNextStep = () => {
    if (index === 4) {
      navigation.replace('TabNav');
    }
    setIndex(index + 1);
  };

  return (
    <Background>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {index === 0 && (
            <Image
              source={require('../../assets/images/onb1.png')}
              style={styles.image}
            />
          )}
          {index === 1 && (
            <Image
              source={require('../../assets/images/onb2.png')}
              style={styles.image}
            />
          )}
          {index === 2 && (
            <Image
              source={require('../../assets/images/onb3.png')}
              style={styles.image}
            />
          )}
          {index === 3 && (
            <Image
              source={require('../../assets/images/onb4.png')}
              style={styles.image}
            />
          )}
          {index === 4 && (
            <Image
              source={require('../../assets/images/onb5.png')}
              style={styles.image}
            />
          )}
          <LinearGradient
            colors={['#005B9E', '#00376B']}
            style={styles.contentContainer}
          >
            <View style={styles.contentWrap}>
              <View style={{ minHeight: 150 }}>
                <Text style={styles.title}>
                  {index === 0 && 'Welcome to Save The Fish!'}
                  {index === 1 && 'The Ocean Needs You'}
                  {index === 2 && 'Learn About Endangered Species'}
                  {index === 3 && 'Clean The Sea Game'}
                  {index === 4 && 'Join Real-Life Actions'}
                </Text>
                <Text style={styles.subtitle}>
                  {index === 0 &&
                    `Discover how you can help protect the North and Baltic Seas.Learn, play, and take action for our oceans.`}
                  {index === 1 &&
                    'Overfishing, plastic pollution, and habitat loss threaten marine life in Germany’s seas. But small actions make a big difference.'}
                  {index === 2 &&
                    'Explore interactive fish cards, daily facts, and important tips on how to live sustainably.'}
                  {index === 3 &&
                    'Play the mini-game, collect ocean waste, and unlock new marine animals while learning how to protect their habitat.'}
                  {index === 4 &&
                    'Find clean-up events, support Greenpeace projects, and become part of the solution.'}
                </Text>
              </View>

              <LargeGradientBtn
                title={
                  index === 0
                    ? 'Get Started'
                    : index > 0 && index <= 3
                    ? 'Next'
                    : 'Let’s Start'
                }
                onPress={handleNextStep}
              />
            </View>
          </LinearGradient>
        </View>
      </ScrollView>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: height * 0.06,
    alignItems: 'center',
  },
  contentWrap: { padding: 20, height: '100%', width: '100%' },
  contentContainer: {
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    borderTopWidth: 2,
    borderWidth: 0.17,
    borderColor: '#F26801',
    width: '100%',
  },
  title: {
    fontFamily: Platform.OS === 'ios' ? 'Nerko One' : 'Nerko',
    fontSize: 26,
    textAlign: 'center',
    color: '#fff',
    marginBottom: 15,
  },
  subtitle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    textAlign: 'center',
    color: '#fff',
    marginBottom: 26,
  },
  image: {
    height: 395,
  },
});

export default Onboard;
