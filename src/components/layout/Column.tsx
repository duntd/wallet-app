import React, {ReactNode} from 'react';
import {StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';

interface Props extends ViewStyle {
  children?: ReactNode;
  onPress?: () => void;
  disableOpacity?: boolean;
}

export const Column: React.FC<Props> = props => {
  let newProps = {...props, children: null};
  if (props.onPress) {
    return (
      <TouchableOpacity
        onPress={props.onPress}
        activeOpacity={props.disableOpacity ? 1 : 0.2}
        style={[styles.container, {...newProps}]}>
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
    justifyContent: 'center',
  },
});
