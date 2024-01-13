import {Icon} from 'assets/icons';
import {Font} from 'components';
import {Colors} from 'const';
import React, {useRef, useState} from 'react';
import {
  Image,
  Text,
  TextInput,
  TextInputProps,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {height, margin, padding, size, width} from 'utils';
import {Label} from './Label';

interface Props extends TextInputProps {
  label?: string;
  warning?: string;
  sensitive?: boolean;
  clear?: boolean;
  multiline?: boolean;
  marginTop?: number;
  marginBottom?: number;
  width?: number;
  required?: boolean;
}

const WarningText = ({text = ''}) => {
  return (
    <Text style={{...Font.f14, ...margin(4, 0, 0, 0), color: Colors.RED5}}>
      {text}
    </Text>
  );
};

export const Input = ({
  label,
  warning,
  sensitive,
  clear,
  value,
  multiline,
  marginTop = 0,
  marginBottom = height(12),
  width: _width,
  required,
  ...props
}: Props) => {
  const BG = Colors.WHITE;
  const WIDTH = _width ? '100%' : width(343);

  const ref = useRef<TextInput>(null);
  const [secure, setSecure] = useState(sensitive);

  return (
    <View style={{...margin(marginTop, 0, marginBottom, 0), width: _width}}>
      {label && <Label label={label} required={required} />}

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: WIDTH,
          ...padding(8, 12, 8, 12),
          borderWidth: 1,
          borderRadius: 6,
          borderColor: ref.current?.isFocused() ? Colors.P6 : Colors.N3,
          backgroundColor: BG,
        }}>
        <TextInput
          {...props}
          value={value}
          ref={ref}
          style={{
            flex: 1,
            ...Font.f14,
            ...(multiline && {maxHeight: height(100)}),
            color: Colors.N7,
            padding: 0,
            //...padding(6, 0, 6, 0),
          }}
          multiline={multiline}
          secureTextEntry={secure}
          autoCapitalize="none"
          autoCorrect={false}
        />

        {sensitive !== undefined && value && (
          <TouchableWithoutFeedback onPress={() => setSecure(!secure)}>
            <Image
              source={secure ? Icon.Hide : Icon.Show}
              style={{...size(24, 24), marginHorizontal: width(4)}}
            />
          </TouchableWithoutFeedback>
        )}

        {clear && value && (
          <TouchableWithoutFeedback
            onPress={() => {
              props.onChangeText && props.onChangeText('');
              ref.current?.clear();
            }}>
            <Image
              source={Icon.Close}
              style={{...size(24, 24), marginHorizontal: width(4)}}
            />
          </TouchableWithoutFeedback>
        )}

        {multiline && (
          <Image
            source={Icon.Resize}
            style={{
              ...size(12, 12),
              position: 'absolute',
              right: 0,
              bottom: 0,
              tintColor: Colors.N5,
            }}
          />
        )}
      </View>

      {warning && <WarningText text={warning} />}
    </View>
  );
};
