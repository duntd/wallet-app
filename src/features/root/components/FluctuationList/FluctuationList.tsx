import {PagingList} from 'components/list';
import {useState} from 'react';
import {FluctuationItem} from './FluctualtionItem';

const FluctuationList = () => {
  const [fetching, setFetching] = useState(false);
  const [query, setQuery] = useState({});
  const [data, setData] = useState<Array<any>>([1, 2, 3, 4]);

  const getData = () => {};

  return (
    <PagingList
      hideCount
      fetching={fetching}
      getData={getData}
      query={query}
      data={data}
      itemKey={'id'}
      renderItem={({item, index}) => {
        return (
          // TODO: render item
          <FluctuationItem fluctuation={item} />
        );
      }}
      ItemSeparatorComponent={undefined}
    />
  );
};

export default FluctuationList;
