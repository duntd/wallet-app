import {AppText} from 'components';
import {Colors} from 'const';
import {Text} from 'react-native';
import {margin} from 'utils';

export const Label = ({label = '', required = false}) => {
  return (
    <AppText f14_bold {...margin(0, 0, 8, 0)}>
      {label}
      {required && <Text style={{color: Colors.RED5}}> *</Text>}
    </AppText>
  );
};
