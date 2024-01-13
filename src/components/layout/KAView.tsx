import React from 'react';
import {KeyboardAvoidingView, Platform, ViewStyle} from 'react-native';

interface Props extends ViewStyle {
  children?: React.ReactNode;
}

export const KAView: React.FC<Props> = props => {
  return (
    <KeyboardAvoidingView
      style={props}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      {props.children}
    </KeyboardAvoidingView>
  );
};
