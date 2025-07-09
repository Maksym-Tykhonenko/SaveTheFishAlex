import {
  Dimensions,
  Image,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Background from '../components/Background';
import Header from '../components/Header';
import SmallGradientBtn from '../components/SmallGradientBtn';
import { fishes } from '../data/fishes';

const { height } = Dimensions.get('window');

const Fishes = () => {
  const handleShare = async fish => {
    try {
      await Share.share({
        message: `${fish.name}
${fish.status}
${fish.description}`,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Background>
      <Header title={'Endangered Fish Cards'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.sectionTitle}>Small Changes, Big Impact</Text>
          {fishes.map((fish, idx) => (
            <View style={styles.fishContainer} key={idx}>
              <Image source={fish.image} style={styles.image} />
              <View style={{ padding: 18 }}>
                <View style={styles.titleWrap}>
                  <Image source={require('../assets/icons/cardFish.png')} />
                  <Text style={styles.fishTitle}>{fish.name}</Text>
                </View>
                <Text style={styles.descText}>{fish.status}</Text>
                <Text style={[styles.descText, { marginBottom: 11 }]}>
                  {fish.description}
                </Text>
                <SmallGradientBtn
                  title={'Share'}
                  onPress={() => handleShare(fish)}
                />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: { padding: 28, paddingBottom: height * 0.16 },
  fishContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    marginTop: 14,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  image: {
    height: 155,
    width: '100%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  sectionTitle: {
    fontFamily: Platform.OS === 'ios' ? 'Nerko One' : 'Nerko',
    fontSize: 18,
    color: '#fff',
  },
  fishTitle: {
    fontFamily: Platform.OS === 'ios' ? 'Nerko One' : 'Nerko',
    fontSize: 18,
    color: '#FF7F20',
  },
  titleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  descText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    color: '#00376B',
    lineHeight: 18,
    marginTop: 13,
  },
});

export default Fishes;
