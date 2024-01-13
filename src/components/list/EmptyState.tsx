import {Images} from 'assets/images';
import {AppText, Column} from 'components';
import {Image} from 'react-native';
import {padding, size} from 'utils';

export const EmptyState = ({text = 'Chưa có đơn xuất bán.'}) => (
  <Column {...padding(170, 0, 24, 0)} alignItems="center">
    <Image source={Images.box} style={size(50, 50)} />
    <AppText f14 {...padding(14, 40, 24, 40)}>
      {text}
    </AppText>
  </Column>
);
