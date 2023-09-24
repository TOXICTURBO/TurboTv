import {View, Text} from 'react-native';
import React from 'react';
import {CardProps, StackNavigation} from '../../../@types';
import {utils} from '../../../utils';
import {
  Container,
  ImageBackground,
  RatingWrapper,
  SubTitle,
  Title,
  Wrapper,
} from './RectangleCard.styles';
import {useNavigation} from '@react-navigation/native';
import {RatingComponent} from '../../Shared';

const RectangleCard = ({
  title,
  id,
  poster_image,
  rating,
  relation_type,
  type,
}: CardProps) => {
  const [focus, setFocus] = React.useState(false);
  const navigation = useNavigation<StackNavigation>();
  const actualTitle = utils.getTitle(title);

  const onPress = () => {
    if (type?.toLowerCase() === 'manga') navigation.navigate('MangaInfo', {id});
    else navigation.navigate('Info', {id});
  };

  return (
    <Container
      activeOpacity={1}
      focus={focus}
      onPress={onPress}
      onFocus={e => {
        setFocus(true);
      }}
      onBlur={() => {
        setFocus(false);
      }}>
      <ImageBackground source={{uri: poster_image}}>
        {/* @ts-ignore */}
        <Wrapper>
          <RatingWrapper>
            <RatingComponent rating={rating} />
          </RatingWrapper>
          <View>
            <Title>{actualTitle}</Title>
            {relation_type ? (
              <SubTitle>{relation_type.replaceAll('_', ' ')}</SubTitle>
            ) : null}
          </View>
        </Wrapper>
      </ImageBackground>
    </Container>
  );
};

export default RectangleCard;
