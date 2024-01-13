import React from 'react';
import {
  ScrollView,
  ScrollViewProps,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {height} from 'utils';

interface Props extends ScrollViewProps {
  children?: React.ReactNode;
}

export const Scroll: React.FC<Props> = props => {
  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: height(100),
      }}>
      <TouchableOpacity activeOpacity={1}>{props.children}</TouchableOpacity>
    </ScrollView>
  );
};
