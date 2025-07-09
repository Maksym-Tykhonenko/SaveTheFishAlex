import {
  Dimensions,
  Image,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Background from '../components/Background';
import Header from '../components/Header';
import { actions } from '../data/actions';
import SmallGradientBtn from '../components/SmallGradientBtn';

const { height } = Dimensions.get('window');

const Home = () => {
  const handleShare = async action => {
    try {
      await Share.share({
        message: `${action.title}
${action.actions}`,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Background>
      <Header title={'What You Can Do'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.sectionTitle}>Small Changes, Big Impact</Text>
          {actions.map((action, idx) => (
            <View style={styles.actionContainer} key={idx}>
              <View style={styles.titleWrap}>
                <Image source={require('../assets/icons/action.png')} />
                <Text style={styles.actionTitle}>{action.title}</Text>

                <LinearGradient
                  colors={['#005B9E', '#00376B']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.quantityBorder}
                >
                  <LinearGradient
                    colors={['#F26801', '#FF7F20']}
                    style={styles.quantityContainer}
                  >
                    <Text style={styles.quantity}>#{idx + 1}</Text>
                  </LinearGradient>
                </LinearGradient>
              </View>
              <Text style={styles.actionsText}>{action.actions}</Text>
              <SmallGradientBtn
                title={'Share'}
                onPress={() => handleShare(action)}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: { padding: 28, paddingBottom: height * 0.16 },
  actionContainer: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 16,
    marginTop: 14,
  },
  image: {
    height: 395,
  },
  sectionTitle: {
    fontFamily: Platform.OS === 'ios' ? 'Nerko One' : 'Nerko',
    fontSize: 18,
    color: '#fff',
  },
  actionTitle: {
    fontFamily: Platform.OS === 'ios' ? 'Nerko One' : 'Nerko',
    fontSize: 18,
    color: '#FF7F20',
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
  quantityContainer: {
    height: 40,
    width: 40,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 1,
    position: 'absolute',
  },
  quantityBorder: {
    height: 40,
    width: 40,
    borderRadius: 16,
    position: 'absolute',
    right: -18,
    top: -18,
  },
  quantity: {
    fontFamily: Platform.OS === 'ios' ? 'Nerko One' : 'Nerko',
    fontSize: 18,
    color: '#fff',
  },
});

export default Home;
