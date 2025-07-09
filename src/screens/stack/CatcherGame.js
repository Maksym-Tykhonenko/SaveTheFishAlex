import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  PanResponder,
  View,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import Orientation from 'react-native-orientation-locker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Background from '../../components/Background';
import Header from '../../components/Header';
import LargeGradientBtn from '../../components/LargeGradientBtn';

const { width, height } = Dimensions.get('window');

const trash = [
  { type: 'trash', img: require('../../assets/images/bottle.png') },
  { type: 'trash', img: require('../../assets/images/bag.png') },
];

const FLASK_WIDTH = 90;
const FLASK_Y = height - 340;
const OBJECT_SIZE = 80;
const FALL_SPEED = 3;

function getRandomObject() {
  const idx = Math.floor(Math.random() * trash.length);
  return trash[idx];
}
function getRandomX() {
  return Math.random() * (width - OBJECT_SIZE);
}
function spawnFallingObject() {
  const obj = getRandomObject();
  return {
    ...obj,
    x: getRandomX(),
    y: 0,
    id: Math.random().toString(36).substring(2, 9),
  };
}

const CatcherGame = () => {
  const navigation = useNavigation();
  const [flaskX, setFlaskX] = useState(width / 2 - FLASK_WIDTH / 2);
  const [fallingObjects, setFallingObjects] = useState([
    spawnFallingObject(),
    spawnFallingObject(),
    spawnFallingObject(),
  ]);
  const [targetObject, setTargetObject] = useState(getRandomObject());
  const [points, setPoints] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [results, setResults] = useState([] || 0);
  const [timeLeft, setTimeLeft] = useState(60);
  const intervalRef = useRef();

  const bestScore = Math.max(...results);

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const seconds = String(timeLeft % 60).padStart(2, '0');

  useEffect(() => {
    fetchScores();
  }, [gameOver]);

  useEffect(() => {
    Orientation.lockToPortrait();

    return () => Orientation.unlockAllOrientations();
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft === 0) {
      clearInterval(intervalRef.current);

      setResults(prev => [...prev, points]);
      saveScores(points);

      setGameOver(true);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (gameOver) return;
    let animId;
    function fall() {
      setFallingObjects(prevObjs => {
        let updatedObjs = prevObjs.map(obj => ({
          ...obj,
          y: obj.y + FALL_SPEED,
        }));

        const toRespawn = [];
        updatedObjs = updatedObjs.filter(obj => {
          if (
            obj.y + OBJECT_SIZE >= FLASK_Y &&
            obj.y < FLASK_Y + 80 &&
            flaskX + FLASK_WIDTH > obj.x &&
            flaskX < obj.x + OBJECT_SIZE
          ) {
            if (obj.type === 'trash') {
              setPoints(p => {
                const newPoints = p + 1;

                return newPoints;
              });
              setTargetObject(getRandomObject());

              toRespawn.push(obj.id);
              return false;
            } else {
              setGameOver(true);
              return false;
            }
          }

          if (obj.y > height) {
            toRespawn.push(obj.id);
            return false;
          }
          return true;
        });

        while (updatedObjs.length < 3) {
          updatedObjs.push(spawnFallingObject());
        }
        return updatedObjs;
      });
      animId = requestAnimationFrame(fall);
    }
    animId = requestAnimationFrame(fall);
    return () => cancelAnimationFrame(animId);
  }, [flaskX, gameOver, targetObject]);

  const saveScores = async score => {
    try {
      const jsonValue = await AsyncStorage.getItem('scores');
      let parced = jsonValue !== null ? JSON.parse(jsonValue) : [];

      const data = [...parced, score];

      await AsyncStorage.setItem('scores', JSON.stringify(data));

      console.log('data', data);
    } catch (e) {
      console.error('Failed', e);
    }
  };

  const fetchScores = async () => {
    try {
      const savedData = await AsyncStorage.getItem('scores');
      const parsed = JSON.parse(savedData);
      if (parsed !== null) {
        setResults(parsed);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dx) > 20,
      onPanResponderMove: (_, gesture) => {
        let newX = flaskX + gesture.dx;
        newX = Math.max(0, Math.min(width - FLASK_WIDTH, newX));
        setFlaskX(newX);
      },
      onPanResponderRelease: () => {},
    }),
  ).current;

  function restart() {
    setGameOver(false);
    setPoints(0);
    setTimeLeft(60);
    setFallingObjects([
      spawnFallingObject(),
      spawnFallingObject(),
      spawnFallingObject(),
    ]);
    setTargetObject(getRandomObject());
  }

  return (
    <Background>
      <Header title={'Mini-game'} goBack={true} />
      <View style={styles.infoWrap}>
        <TouchableOpacity activeOpacity={1} style={{ width: '30%' }}>
          <LinearGradient
            colors={['#B24C00', '#FFA765']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.border}
          >
            <LinearGradient
              colors={['#F26801', '#FF7F20']}
              style={styles.button}
            >
              <Image source={require('../../assets/icons/time.png')} />
              <Text style={styles.label}>
                {minutes}:{seconds}
              </Text>
            </LinearGradient>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={1} style={{ width: '30%' }}>
          <LinearGradient
            colors={['#B24C00', '#FFA765']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.border}
          >
            <LinearGradient
              colors={['#F26801', '#FF7F20']}
              style={styles.button}
            >
              <Image source={require('../../assets/icons/trash.png')} />
              <Text style={styles.label}>{points}/25</Text>
            </LinearGradient>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <View style={styles.containerGame} {...panResponder.panHandlers}>
        {!gameOver &&
          fallingObjects.map(obj => (
            <Image
              key={obj.id}
              source={obj.img}
              style={[
                styles.object,
                {
                  left: obj.x,
                  top: obj.y,
                  width: OBJECT_SIZE,
                  height: OBJECT_SIZE,
                },
              ]}
            />
          ))}

        <View>
          <Image
            source={require('../../assets/images/catcher.png')}
            style={[
              styles.flask,
              { left: flaskX, top: FLASK_Y, width: FLASK_WIDTH, height: 94 },
            ]}
          />
        </View>

        {gameOver && (
          <View style={styles.gameOver}>
            <LinearGradient
              colors={['#F26801', '#FF7F20']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.modalContainer}
            >
              <View style={styles.modalGradient}>
                <View style={{ alignItems: 'center' }}>
                  <Image source={require('../../assets/images/gameOver.png')} />
                </View>

                <Text style={styles.modalTitle}>
                  {points >= 25 ? `Well Done!` : `Time’s Up!`}
                </Text>
                <Text style={styles.modalSubtitle}>
                  {points >= 25
                    ? `You’ve cleaned all the trash! The ocean is a little safer now.`
                    : ` You didn’t manage to clean all the trash. Try again and save more fish!`}
                </Text>
                {points >= 25 && (
                  <Text style={[styles.score, { marginBottom: 5 }]}>
                    Your score: {points}
                  </Text>
                )}
                <Text style={styles.score}>Best score: {bestScore}</Text>

                <LargeGradientBtn
                  title={'Try again'}
                  colors={['#005B9E', '#00376B']}
                  textColor="#fff"
                  onPress={restart}
                />
                <View style={{ alignItems: 'center' }}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.buttonWrap}
                    onPress={() => navigation.goBack()}
                  >
                    <Text style={styles.buttonModalText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </LinearGradient>
          </View>
        )}
      </View>
      <View style={{ alignItems: 'center' }}>
        <View style={styles.line} />
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  containerGame: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  modalTitle: {
    fontFamily: Platform.OS === 'ios' ? 'Nerko One' : 'Nerko',
    fontSize: 26,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 19,
    marginTop: 13,
  },
  infoWrap: {
    flexDirection: 'row',
    paddingHorizontal: 30,
    justifyContent: 'space-between',
    marginTop: 16,
  },
  score: {
    fontFamily: Platform.OS === 'ios' ? 'Nerko One' : 'Nerko',
    fontSize: 26,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 19,
  },
  modalSubtitle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 19,
  },
  modalGradient: {
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 25,
  },
  modalContainer: {
    width: '85%',
    borderRadius: 22,
  },
  buttonWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30,
  },
  buttonModalText: {
    fontFamily: Platform.OS === 'ios' ? 'Nerko One' : 'Nerko',
    fontSize: 22,
    color: '#fff',
    marginTop: 14,
  },
  flask: { position: 'absolute', bottom: 120, resizeMode: 'contain' },
  object: { position: 'absolute', resizeMode: 'contain' },
  gameOver: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 180,
  },
  button: {
    width: '100%',
    height: 40,
    padding: 2,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 3,
  },
  border: { width: '100%', height: 40, borderRadius: 22 },
  label: {
    fontFamily: Platform.OS === 'ios' ? 'Nerko One' : 'Nerko',
    fontSize: 18,
    color: '#042B4C',
  },
  line: {
    width: '80%',
    height: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 500,
    position: 'absolute',
    bottom: 90,
  },
});

export default CatcherGame;
