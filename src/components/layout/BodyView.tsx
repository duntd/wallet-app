import {Colors} from 'const';
import React, {ReactNode, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ViewStyle,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {height, width} from 'utils';

interface Props extends ViewStyle {
  scroll?: boolean;
  pt_100?: boolean;
  pt_24?: boolean;
  onBodyPress?: () => void;
  center?: boolean;
  onRefresh?: () => void;
  white?: boolean;
  ph_16?: boolean;
  children?: ReactNode;
}

export const BodyView: React.FC<Props> = props => {
  const [refreshing] = useState(false);
  const {scroll, pt_100, pt_24, center, white, ph_16} = props;
  if (scroll) {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
          if (props.onBodyPress) {
            props.onBodyPress();
          }
        }}>
        <View
          style={[
            styles.container,
            props,
            white ? {backgroundColor: Colors.N1} : null,
            pt_100 ? {paddingTop: height(100)} : null,
            ph_16 ? {paddingHorizontal: width(16)} : null,
          ]}>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={props.onRefresh ? props.onRefresh : () => {}}
              />
            }
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="always"
            nestedScrollEnabled
            contentContainerStyle={[
              {paddingBottom: height(200)},
              pt_24 ? {paddingTop: height(24)} : null,
            ]}>
            <TouchableOpacity
              style={[center ? {alignItems: 'center'} : null]}
              activeOpacity={1}
              onPress={() => Keyboard.dismiss()}>
              {props.children}
            </TouchableOpacity>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    );
  } else {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
          if (props.onBodyPress) {
            props.onBodyPress();
          }
        }}>
        <View
          style={[
            styles.container,
            props,
            white ? {backgroundColor: Colors.N1} : null,
            pt_100 ? {paddingTop: height(100)} : null,
            pt_24 ? {paddingTop: height(24)} : null,
            center ? {alignItems: 'center'} : null,
            ph_16 ? {paddingHorizontal: width(16)} : null,
          ]}>
          {props.children}
        </View>
      </TouchableWithoutFeedback>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.N1,
    zIndex: 1,
  },
  scrollTouch: {flex: 1, zIndex: 1},
});
