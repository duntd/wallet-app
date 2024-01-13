import React from 'react';
import {View, StyleSheet, ViewStyle, TouchableOpacity} from 'react-native';

interface Props extends ViewStyle {
  children?: React.ReactNode;
  onPress?: () => void;
  disableActivePress?: boolean;
}

export const Container: React.FC<Props> = props => {
  let newProps = {...props, children: null};
  if (props.onPress) {
    return (
      <TouchableOpacity
        activeOpacity={props.disableActivePress ? 1 : 0.2}
        style={[styles.container, {...newProps}]}
        onPress={props.onPress}>
        {props.children}
      </TouchableOpacity>
    );
  }
  return (
    <View style={[styles.container, {...newProps}]}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
