import {Icon} from 'assets/icons';
import {Font} from 'components';
import {Colors} from 'const';
import React from 'react';
import {Image, TextInputProps, TouchableOpacity, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {height, margin, padding, size, width} from 'utils';

interface Props extends TextInputProps {
  onSearch: () => void;
  marginTop?: number;
  marginBottom?: number;
  width?: number;
}

export const SearchInput = ({
  onSearch,
  marginTop = 0,
  marginBottom = height(10),
  width: _width,
  ...props
}: Props) => {
  const WIDTH = _width ? _width : width(343);
  return (
    <View
      style={{
        flexDirection: 'row',
        width: WIDTH,
        borderRadius: 50,
        alignItems: 'center',
        alignSelf: 'center',
        ...margin(marginTop, 0, marginBottom, 0),
        ...padding(8, 12, 8, 12),
        backgroundColor: Colors.N2,
      }}>
      <TouchableOpacity onPress={onSearch}>
        <Image
          source={Icon.Search}
          style={{...size(20, 20), marginRight: width(8)}}
        />
      </TouchableOpacity>
      <TextInput
        {...props}
        style={{flex: 1, ...Font.f14, padding: 0, color: Colors.N7}}
        placeholderTextColor={Colors.N6}
        autoCapitalize="none"
        autoCorrect={false}
        onSubmitEditing={onSearch}
      />
    </View>
  );
};
