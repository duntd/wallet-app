import {AppText, Column, Row} from 'components';
import {Fluctuation} from '../types/fluctuation';
import {Colors} from 'const';
import {DateUtil, borderRadius, margin, padding, width} from 'utils';
import FastImage from 'react-native-fast-image';
import {Asset} from 'features/root/assets';

type Props = {
  fluctuation: Fluctuation;
};

export const FluctuationItem = ({fluctuation}: Props) => {
  const isUp = fluctuation.amount > 0;
  const color = isUp ? Colors.GREEN400 : Colors.RED400;

  return (
    <Column
      backgroundColor={Colors.P50}
      {...padding(12, 12)}
      {...margin(8, 0)}
      width={width(343)}
      {...borderRadius(12)}
      {...{
        shadowColor: color,
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,

        elevation: 8,
      }}
      borderRightWidth={2}
      borderRightColor={color}
      opacity={0.85}
      alignSelf="center">
      <Row>
        <FastImage source={isUp ? Asset.chartUp : Asset.chartDown} />
        <AppText flex={1} f14_bold {...margin(0, 0, 10, 6)}>
          {fluctuation.name}
        </AppText>
      </Row>

      <Row justifyContent="space-between">
        <AppText f12 fontStyle="italic">
          {DateUtil.dateTimeFormatView(fluctuation.created_at)}
        </AppText>

        <AppText f14 color={color} textAlign="right">
          {fluctuation.amount}đ
        </AppText>
      </Row>
    </Column>
  );
};
