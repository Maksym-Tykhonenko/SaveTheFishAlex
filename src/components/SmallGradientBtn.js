import { Platform, StyleSheet, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const SmallGradientBtn = ({ title, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={{ width: '50%' }}
    >
      <LinearGradient
        colors={['#B24C00', '#FFA765']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.border}
      >
        <LinearGradient colors={['#F26801', '#FF7F20']} style={styles.button}>
          <Text style={styles.label}>{title}</Text>
        </LinearGradient>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 42,
    padding: 2,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  border: { width: '100%', height: 42, borderRadius: 12 },
  label: {
    fontFamily: Platform.OS === 'ios' ? 'Nerko One' : 'Nerko',
    fontSize: 18,
    color: '#042B4C',
  },
});

export default SmallGradientBtn;
