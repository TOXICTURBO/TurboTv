import {FlatList} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, SharedContainerRel} from '../../styles/sharedStyles';
import {AnimeTrending} from '../../utils/TestData';
import {
  NoDataText,
  NoDataTextWrapper,
  SelectorContainer,
  Title,
  Wrapper,
} from './ListScreen.styles';
import {ListCard} from '../../components/Cards';
import {ListContainer} from '../../containers';
import {useQuery} from '@tanstack/react-query';
import {useAccessToken} from '../../contexts';
import {Anilist} from '@tdanks2000/anilist-wrapper';
import {
  Lists,
  MiddleOfScreenLoadingComponent,
  MiddleOfScreenTextComponent,
} from '../../components';
import {MediaListStatus} from '../../@types';
import {api} from '../../utils';
import {PanGestureHandler, Swipeable} from 'react-native-gesture-handler';

const ListsScreen = () => {
  const [selectedList, setSelectedList] =
    React.useState<MediaListStatus>('CURRENT');
  const {accessToken} = useAccessToken();
  const anilist = new Anilist(accessToken);

  const listTypes: {
    name: string;
    value: MediaListStatus;
  }[] = [
    {
      name: 'Watching',
      value: 'CURRENT',
    },
    {
      name: 'Plan to Watch',
      value: 'PLANNING',
    },
    {
      name: 'On Hold',
      value: 'PAUSED',
    },

    {
      name: 'Re Watching',
      value: 'REPEATING',
    },
    {
      name: 'Completed',
      value: 'COMPLETED',
    },
    {
      name: 'Dropped',
      value: 'DROPPED',
    },
  ];

  const {isPending, isError, data, error} = useQuery({
    queryKey: ['user-lists'],
    queryFn: () => api.fetchAnilistLists(accessToken, anilist),
  });

  if (isError)
    return (
      <MiddleOfScreenTextComponent
        text={error?.message ?? 'There was an unexpected error'}
      />
    );
  if (isPending) return <MiddleOfScreenLoadingComponent />;
  if (data?.length <= 0)
    return (
      <MiddleOfScreenTextComponent text="Seems like you are not logged in!" />
    );

  const selectedLisData = data[selectedList?.toLowerCase()];

  if (!selectedLisData)
    return (
      <MiddleOfScreenTextComponent text={'There was an unexpected error'} />
    );

  return (
    <SafeAreaView>
      <SharedContainerRel>
        <SelectorContainer>
          <Lists.Selector
            data={data}
            listTypes={listTypes}
            selectedList={selectedList}
            setSelectedList={setSelectedList}
            selectedColor={data.color}
          />
        </SelectorContainer>
        <Wrapper>
          {selectedLisData?.length === 0 ? (
            <NoDataTextWrapper>
              <NoDataText>This list is empty!</NoDataText>
            </NoDataTextWrapper>
          ) : (
            <ListContainer data={selectedLisData} />
          )}
        </Wrapper>
      </SharedContainerRel>
    </SafeAreaView>
  );
};

export default ListsScreen;
