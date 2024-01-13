import {Icon} from 'assets/icons';
import {AppText} from 'components';
import {Colors} from 'const';
import React from 'react';
import {
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {height, padding, size, width} from 'utils';

interface Props extends TouchableOpacityProps {
  label?: string;
  icon?: ImageSourcePropType;
  outline?: boolean;
}

export const FloatButton = ({
  label,
  icon = Icon.Plus,
  outline,
  onPress,
  ...props
}: Props) => {
  const PADDING_VERTICAL = !!icon ? 16 : 10;
  const PADDING_HORIZONTAL = 16;
  const BG = onPress
    ? outline
      ? Colors.WHITE
      : Colors.P5
    : icon
    ? Colors.WHITE
    : Colors.N3;
  const TINT_COLOR = onPress
    ? outline
      ? Colors.BLACK
      : Colors.WHITE
    : icon
    ? Colors.WHITE
    : Colors.N3;
  const BORDER_COLOR = onPress && !outline ? Colors.P5 : Colors.N3;
  const RADIUS = label ? 10 : 100;

  return (
    <TouchableOpacity
      {...props}
      style={[
        {
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',

          backgroundColor: BG,
          borderWidth: 1,
          borderRadius: RADIUS,
          borderColor: BORDER_COLOR,
          position: 'absolute',
          right: width(14),
          bottom: height(14),
        },
        padding(
          PADDING_VERTICAL,
          PADDING_HORIZONTAL,
          PADDING_VERTICAL,
          PADDING_HORIZONTAL,
        ),
        props.style,
      ]}
      onPress={onPress}>
      {icon && (
        <Image source={icon} style={[{tintColor: TINT_COLOR}, size(24, 24)]} />
      )}

      {label && (
        <AppText f16_bold color={TINT_COLOR}>
          {label}
        </AppText>
      )}
    </TouchableOpacity>
  );
};
