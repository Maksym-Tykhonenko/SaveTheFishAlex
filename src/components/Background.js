import { Children } from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Background = ({
  style = {
    flex: 1,
  },
  children,
}) => {
  return (
    <LinearGradient style={style} colors={['#005B9E', '#00376B']}>
      {children}
    </LinearGradient>
  );
};

export default Background;
