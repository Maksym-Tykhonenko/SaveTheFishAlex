import { Platform, StyleSheet, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const LargeGradientBtn = ({
  title,
  onPress,
  btnWidth,
  colors = ['#F26801', '#FF7F20'],
  textColor = '#042B4C',
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={{ width: btnWidth }}
    >
      <LinearGradient
        colors={['#B24C00', '#FFA765']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.border}
      >
        <LinearGradient colors={colors} style={styles.button}>
          <Text style={[styles.label, { color: textColor }]}>{title}</Text>
        </LinearGradient>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 62,
    padding: 2,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  border: { width: '100%', height: 62, borderRadius: 22 },
  label: {
    fontFamily: Platform.OS === 'ios' ? 'Nerko One' : 'Nerko',
    fontSize: 22,
    color: '#042B4C',
  },
});

export default LargeGradientBtn;
