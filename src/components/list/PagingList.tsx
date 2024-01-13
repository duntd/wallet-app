import {useIsFocused} from '@react-navigation/native';
import {Container, Font, Row, Spacing} from 'components';
import {Colors} from 'const';
import _ from 'lodash';
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  FlatListProps,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import {EventUtil, height, padding, width} from 'utils';

interface ObjectInterface {
  [key: string]: string | number | boolean;
}

interface Props extends FlatListProps<any> {
  itemName?: string;
  itemKey: string;
  hideCount?: boolean;
  hideFooter?: boolean;
  query?: any;
  getData: (page: number) => void;
  data: any[];
  fetching?: boolean;
}

const PAGE_SIZE: number = 10;

const PagingList: React.FC<Props> = props => {
  const isFocused = useIsFocused();
  const {getData, data, query} = props;
  const [refreshing, setRefreshing] = useState(false);

  const ref = useRef(query);

  const [page, setPage] = useState(1);
  const onRefresh = () => {
    getData(1);
    setPage(1);
  };

  const onLoadMore = () => {
    if (page * PAGE_SIZE > data?.length) {
      return;
    }
    getData(page + 1);
    setPage(page + 1);
  };

  useEffect(() => {
    console.log({query});
    const change = !_.isEqual(ref.current, query);
    if (change) {
      setTimeout(() => {
        onRefresh();
        ref.current = query;
      }, 500);
      return;
    }

    if (isFocused && !change) {
      onRefresh();
    }
  }, [query, isFocused]);

  const renderFooter = () => (
    <View style={{height: height(300), ...padding(24, 0, 0, 0)}}>
      {props.fetching && <ActivityIndicator size="large" color={Colors.P6} />}
    </View>
  );

  return (
    <Container>
      {!props.hideCount && (
        <View>
          <Spacing height={10} />
          <Row paddingHorizontal={width(16)}>
            <Text style={Font.f14}>
              Kết quả{' '}
              <Text style={[Font.f16, {color: Colors.P6}]}>
                {`(${props.data?.length ?? 0})`}
              </Text>
            </Text>
          </Row>
          <Spacing height={10} />
        </View>
      )}
      <FlatList
        {...props}
        onEndReached={() => {
          if (EventUtil.listeners.apiList.length > 0) {
            return;
          }
          onLoadMore();
        }}
        contentContainerStyle={{
          paddingBottom: height(100),
        }}
        keyExtractor={(item, index) => `${index}${item[props.itemKey]}`}
        refreshing={refreshing}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListFooterComponent={renderFooter}
        ItemSeparatorComponent={() => (
          <Spacing width={'100%'} height={1} bg={Colors.N3} />
        )}
      />
    </Container>
  );
};

export default PagingList;
