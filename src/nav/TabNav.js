import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Platform, StyleSheet, View } from 'react-native';

import Facts from '../screens/Facts';
import Fishes from '../screens/Fishes';
import Home from '../screens/Home';
import Map from '../screens/Map';
import Game from '../screens/Game';
import LinearGradient from 'react-native-linear-gradient';

const Tab = createBottomTabNavigator();

const TabNav = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#fff',
        tabBarBackground: () => (
          <View style={{ flex: 1 }}>
            <LinearGradient
              colors={['#B24C00', '#FFA765']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.tabBarBg}
            >
              <LinearGradient
                colors={['#F26801', '#FF7F20']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.tabBarBorder}
              ></LinearGradient>
            </LinearGradient>
          </View>
        ),
      }}
    >
      <Tab.Screen
        name="Facts"
        component={Facts}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <LinearGradient
              colors={['#FFA765', '#B24C00']}
              style={styles.gradientBorder}
            >
              <LinearGradient
                colors={
                  focused ? ['#005B9E', '#00376B'] : ['#FF7F20', '#B24C00']
                }
                style={styles.gradientInner}
              >
                <Image
                  source={require('../assets/icons/facts.png')}
                  style={{ tintColor: color }}
                />
              </LinearGradient>
            </LinearGradient>
          ),
        }}
      />
      <Tab.Screen
        name="Fishes"
        component={Fishes}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <LinearGradient
              colors={['#FFA765', '#B24C00']}
              style={styles.gradientBorder}
            >
              <LinearGradient
                colors={
                  focused ? ['#005B9E', '#00376B'] : ['#FF7F20', '#B24C00']
                }
                style={styles.gradientInner}
              >
                <Image
                  source={require('../assets/icons/fish.png')}
                  style={{ tintColor: color }}
                />
              </LinearGradient>
            </LinearGradient>
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <LinearGradient
              colors={['#FFA765', '#B24C00']}
              style={styles.gradientBorder}
            >
              <LinearGradient
                colors={
                  focused ? ['#005B9E', '#00376B'] : ['#FF7F20', '#B24C00']
                }
                style={styles.gradientInner}
              >
                <Image
                  source={require('../assets/icons/list.png')}
                  style={{ tintColor: color }}
                />
              </LinearGradient>
            </LinearGradient>
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={Map}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <LinearGradient
              colors={['#FFA765', '#B24C00']}
              style={styles.gradientBorder}
            >
              <LinearGradient
                colors={
                  focused ? ['#005B9E', '#00376B'] : ['#FF7F20', '#B24C00']
                }
                style={styles.gradientInner}
              >
                <Image
                  source={require('../assets/icons/map.png')}
                  style={{ tintColor: color }}
                />
              </LinearGradient>
            </LinearGradient>
          ),
        }}
      />
      <Tab.Screen
        name="Game"
        component={Game}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <LinearGradient
              colors={['#FFA765', '#B24C00']}
              style={styles.gradientBorder}
            >
              <LinearGradient
                colors={
                  focused ? ['#005B9E', '#00376B'] : ['#FF7F20', '#B24C00']
                }
                style={styles.gradientInner}
              >
                <Image
                  source={require('../assets/icons/game.png')}
                  style={{ tintColor: color }}
                />
              </LinearGradient>
            </LinearGradient>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarBg: { height: 62, borderRadius: 22 },
  tabBarBorder: { height: 62, padding: 2, borderRadius: 22 },
  tabBar: {
    paddingTop: 12,
    elevation: 0,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 60,
    borderTopWidth: 0,
    marginHorizontal: 50,
    backgroundColor: 'transparent',
    paddingBottom: Platform.OS === 'ios' ? 2 : 22,
  },
  gradientBorder: {
    width: 52,
    height: 52,
    borderRadius: 20,
  },
  gradientInner: {
    borderRadius: 20,
    padding: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 52,
    height: 52,
  },
});

export default TabNav;
