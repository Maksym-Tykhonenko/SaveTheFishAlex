import {
  Dimensions,
  Image,
  Share,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { mapStyle } from '../data/mapStyle';
import { useCallback, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import Orientation from 'react-native-orientation-locker';
import { useFocusEffect } from '@react-navigation/native';

import Header from '../components/Header';
import { places } from '../data/places';
import SmallGradientBtn from '../components/SmallGradientBtn';

const { height } = Dimensions.get('window');

const Map = () => {
  const [selectedMarker, setSelectedMarker] = useState(null);

  useFocusEffect(
    useCallback(() => {
      Orientation.lockToPortrait();

      return () => Orientation.unlockAllOrientations();
    }, []),
  );

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${selectedMarker.place}
  ${selectedMarker.description}`,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <MapView
        style={styles.map}
        userInterfaceStyle="dark"
        customMapStyle={mapStyle}
        initialRegion={{
          latitude: 54.4195,
          longitude: 8.574,
          latitudeDelta: 0.22,
          longitudeDelta: 0.22,
        }}
      >
        {places.map((marker, idx) => (
          <Marker
            key={idx}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            onPress={() => setSelectedMarker(marker)}
          >
            <Image source={require('../assets/icons/marker.png')} />
          </Marker>
        ))}
      </MapView>

      <Header title={'German Sea Map'} />

      {selectedMarker && (
        <View style={StyleSheet.absoluteFill}>
          <TouchableWithoutFeedback onPress={() => setSelectedMarker(null)}>
            <View style={styles.backdrop}>
              <View style={styles.fishContainer}>
                <Image source={selectedMarker.image} style={styles.image} />

                <View style={{ padding: 18 }}>
                  <Text style={styles.fishTitle}>{selectedMarker.place}</Text>

                  <Text style={styles.descText}>
                    {selectedMarker.description}
                  </Text>
                  <TouchableWithoutFeedback>
                    <SmallGradientBtn title={'Share'} onPress={handleShare} />
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  fishContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 16,
    marginTop: 35,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  backdrop: {
    flex: 1,
    top: height * 0.14,
    alignItems: 'center',
  },
  image: {
    height: 155,
    width: '100%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  fishTitle: {
    fontFamily: Platform.OS === 'ios' ? 'Nerko One' : 'Nerko',
    fontSize: 18,
    color: '#FF7F20',
  },
  descText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    color: '#00376B',
    lineHeight: 18,
    marginTop: 13,
    marginBottom: 15,
  },
});

export default Map;
