import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {Icon} from 'assets/icons';
import {AppText} from 'components';
import {Colors} from 'const';
import React, {useEffect, useState} from 'react';
import {Image, Platform, TouchableWithoutFeedback, View} from 'react-native';
import {DateUtil, height, margin, padding, size, width} from 'utils';
import {Label} from './Label';

interface Props {
  date: string | Date;
  onChangeDate?: (date: string | Date) => void;
  marginTop?: number;
  marginBottom?: number;
  disable?: boolean;
  label?: string;
  width?: number;
  required?: boolean;
}

export const DateInput = ({
  marginTop = 0,
  marginBottom = height(10),
  disable = false,
  label,
  width: _width,
  onChangeDate,
  required,
  ...props
}: Props) => {
  const BG = Colors.WHITE;
  const WIDTH = _width ? '100%' : width(343);
  const DEFAULT_DATE = props.date ? new Date(props.date) : new Date();
  const [date, setDate] = useState(DEFAULT_DATE);
  const [mode, setMode] = useState<any>('date');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  useEffect(() => {
    let _date = props.date ? new Date(props.date) : new Date();
    setDate(_date);
  }, [props.date]);

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate ?? new Date();
    onChangeDate && onChangeDate(DateUtil.dateFormatData(currentDate));
    setDate(currentDate);
  };

  const showMode = (currentMode: any) => {
    showDatePickerIOS();
    setMode(currentMode);
    Platform.OS === 'android' &&
      DateTimePickerAndroid.open({
        value: date,
        onChange,
        mode: currentMode,
        is24Hour: true,
        timeZoneName: 'Asia/Vietnam',
      });
  };

  const showDatePicker = () => {
    if (disable) return;
    showMode('date');
  };

  const showTimePicker = () => {
    showMode('time');
  };

  const showDatePickerIOS = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePickerIOS = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    setDate(date);
    onChangeDate && onChangeDate(DateUtil.dateFormatData(date));
    hideDatePickerIOS();
  };
  return (
    <View style={{...margin(marginTop, 0, marginBottom, 0), width: _width}}>
      {label && <Label label={label} required={required} />}
      <TouchableWithoutFeedback onPress={showDatePicker}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            //...margin(marginTop, 0, marginBottom, 0),
            ...padding(8, 12, 8, 12),
            width: WIDTH,
            borderWidth: 1,
            borderRadius: 6,
            borderColor: props.date && !disable ? Colors.P6 : Colors.N3,
            backgroundColor: BG,
          }}>
          <AppText f14 flex={1} color={Colors.N7} {...padding(0, 8, 0, 0)}>
            {props.date ? DateUtil.dateFormatView(date) : '...'}
          </AppText>
          <Image source={Icon.Calendar} style={{...size(20, 20)}} />
        </View>
      </TouchableWithoutFeedback>

      {Platform.OS == 'ios' && (
        <DateTimePickerModal
          isDarkModeEnabled={false}
          isVisible={isDatePickerVisible}
          mode={mode}
          onConfirm={handleConfirm}
          onCancel={hideDatePickerIOS}
          display="inline"
          themeVariant="light"
          textColor={Colors.N6}
          accentColor={Colors.P5}
          confirmTextIOS="Chọn"
          cancelTextIOS="Huỷ"
          locale="vi-VI"
        />
      )}
    </View>
  );
};
