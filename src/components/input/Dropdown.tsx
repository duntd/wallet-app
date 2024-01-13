import {Colors} from 'const';
import React from 'react';
import {DimensionValue, StyleSheet, Text} from 'react-native';
import {Dropdown as LibDropdown} from 'react-native-element-dropdown';
import {height, margin, padding, size, width} from 'utils';
import {Label} from './Label';
import {Column} from 'components/layout';
import {Font} from 'components/text';

interface Props {
  label: string; //drop title
  data: any[]; //drop data
  required?: boolean; // require label
  disable?: boolean; // disable drop
  onSelect: (value: any) => void; // select item
  textValue: any;
  errorMessage?: string;
  subTitle?: string;
  onRemove?: () => void;
  labelKey?: string;
  valueKey?: string;
  disableSearch?: boolean;
  width?: DimensionValue;
  marginTop?: number;
  marginBottom?: number;
}

export const Dropdown = ({
  label,
  required,
  onSelect,
  disable,
  errorMessage,
  subTitle,
  data,
  labelKey = 'label',
  valueKey = 'value',
  disableSearch,
  textValue,
  width,
  marginTop = 0,
  marginBottom = height(10),
}: Props) => {
  if (textValue === '') textValue = null;

  let placeholder = textValue ?? 'Chọn';
  disable && (placeholder = textValue ?? '');

  let validData = data?.map(i => ({
    ...i,
    [labelKey]: i[labelKey] ?? '',
    [valueKey]: i[valueKey] ?? '',
  }));

  return (
    <Column
      backgroundColor={disable ? Colors.N3 : Colors.N1}
      width={width ? width : '100%'}
      {...margin(marginTop, 0, marginBottom, 0)}>
      {label && <Label label={label} required={required} />}

      <LibDropdown
        style={[
          styles.dropDown,
          disable && {backgroundColor: Colors.N2, borderWidth: 0},
          {
            borderWidth: 1,
            borderColor:
              textValue && textValue != '' && !disable ? Colors.P6 : Colors.N3,
            borderRadius: 6,
            ...padding(4, 12, 4, 12),

            maxHeight: height(50),
          },
        ]}
        itemTextStyle={Font.f14}
        selectedTextStyle={Font.f14}
        inputSearchStyle={styles.inputSearchStyle}
        itemContainerStyle={[styles.itemContainerStyle]}
        placeholderStyle={styles.placeholder}
        iconStyle={styles.icon}
        data={validData}
        maxHeight={height(250)}
        searchPlaceholder="Tìm kiếm"
        searchField={labelKey}
        placeholder={placeholder}
        value={textValue}
        labelField={labelKey}
        valueField={valueKey}
        onChange={onSelect}
        search={!disableSearch}
        disable={disable}
      />
      {!!errorMessage && (
        <Text
          style={{
            ...Font.f14,
            color: Colors.RED5,
            marginTop: height(3),
          }}>
          {errorMessage}
        </Text>
      )}
    </Column>
  );
};

const styles = StyleSheet.create({
  dropDown: {
    paddingHorizontal: width(12),
  },
  text: {
    ...Font.f14,
    color: Colors.N7,
  },
  placeholder: {
    ...Font.f14,
    color: Colors.N4,
  },
  icon: {tintColor: Colors.BLACK, ...size(24, 24)},
  inputSearchStyle: {
    borderRadius: 6,
    ...Font.f14,
  },
  itemContainerStyle: {
    borderBottomWidth: 1,
    borderColor: Colors.N3,
  },
});
