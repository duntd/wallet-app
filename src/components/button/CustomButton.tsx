import {AppText} from 'components';
import {Colors} from 'const';
import React from 'react';
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {padding, size, width} from 'utils';

interface Props extends TouchableOpacityProps {
  label?: string;
  icon?: ImageSourcePropType;
  outline?: boolean;
  labelStyle?: TextStyle;
  iconStyle?: ImageStyle;
}

export const CustomButton = ({
  label,
  icon,
  outline,
  onPress,
  labelStyle,
  iconStyle,
  ...props
}: Props) => {
  const PADDING_VERTICAL = !!icon ? 8 : 10;
  const PADDING_HORIZONTAL = 16;
  const BG = onPress
    ? outline
      ? Colors.WHITE
      : Colors.P6
    : icon
    ? Colors.WHITE
    : Colors.N4;
  const TINT_COLOR: any = onPress
    ? outline
      ? Colors.BLACK
      : Colors.WHITE
    : icon
    ? Colors.WHITE
    : Colors.N3;
  const BORDER_COLOR = onPress && !outline ? Colors.P6 : Colors.N3;

  return (
    <TouchableOpacity
      {...props}
      onPress={onPress}
      style={[
        {
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: BG,
          borderWidth: 1,
          borderRadius: 6,
          borderColor: BORDER_COLOR,
        },
        padding(
          PADDING_VERTICAL,
          PADDING_HORIZONTAL,
          PADDING_VERTICAL,
          PADDING_HORIZONTAL,
        ),
        props.style,
      ]}>
      {icon && (
        <Image
          source={icon}
          style={[
            {
              tintColor: TINT_COLOR,
              marginRight: width(8),
              ...iconStyle,
            },
            size(24, 24),
          ]}
        />
      )}

      {label && (
        <AppText f14_bold color={TINT_COLOR} {...labelStyle}>
          {label}
        </AppText>
      )}
    </TouchableOpacity>
  );
};
