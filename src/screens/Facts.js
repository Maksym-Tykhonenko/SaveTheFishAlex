import {
  Dimensions,
  Image,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useState } from 'react';
import LottieView from 'lottie-react-native';

import { facts } from '../data/facts';
import Background from '../components/Background';
import Header from '../components/Header';
import SmallGradientBtn from '../components/SmallGradientBtn';
import LargeGradientBtn from '../components/LargeGradientBtn';

const { height } = Dimensions.get('window');

const Facts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [fact, setFact] = useState('');
  const [step, setStep] = useState(1);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${fact}
`,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const getRandomFact = () => {
    setIsLoading(true);
    setFact('');
    setStep(0);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * facts.length);
      setFact(facts[randomIndex]);
      setIsLoading(false);
      setStep(2);
    }, 4000);
  };

  return (
    <Background>
      <Header title={'Daily Fact'} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ height: 600 }}
      >
        <View style={styles.container}>
          <Image source={require('../assets/images/facts.png')} />
          <View style={{ paddingHorizontal: 28 }}>
            {step === 1 && (
              <LargeGradientBtn
                title={'Get my daily fact'}
                onPress={getRandomFact}
              />
            )}
          </View>

          <View style={{ paddingHorizontal: 28, alignItems: 'center' }}>
            {step === 2 && (
              <View style={styles.factContainer}>
                <Text style={styles.fact}>{fact}</Text>

                <SmallGradientBtn
                  title={'Share'}
                  onPress={() => handleShare()}
                />
              </View>
            )}
            {isLoading && (
              <LottieView
                source={require('../assets/animations/earth.json')}
                autoPlay
                style={{
                  width: 196,
                  height: 199,
                  top: -40,
                }}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: { paddingBottom: height * 0.16, alignSelf: 'center' },
  factContainer: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 16,
    marginTop: 14,
    position: 'absolute',
    top: -40,
  },

  sectionTitle: {
    fontFamily: Platform.OS === 'ios' ? 'Nerko One' : 'Nerko',
    fontSize: 18,
    color: '#fff',
  },
  fact: {
    fontFamily: Platform.OS === 'ios' ? 'Nerko One' : 'Nerko',
    fontSize: 18,
    color: '#FF7F20',
    marginBottom: 17,
  },
  titleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  actionsText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    color: '#00376B',
    lineHeight: 18,
    marginTop: 13,
    marginBottom: 24,
  },
});

export default Facts;
