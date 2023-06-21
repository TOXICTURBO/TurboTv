import {useWindowDimensions, Text} from 'react-native';
import React from 'react';
import {
  Container,
  ImageBackground,
  RatingContainer,
  RatingIcon,
  RatingText,
  Title,
  TopContainer,
  WatchNowButton,
  WatchNowButtonText,
  WatchNowContainer,
  Wrapper,
} from './BannerCard.styles';

interface Props {
  image: string;
  title: string;
  rating: string;
  screenSize: number;
}

const BannerCard = ({image, rating, title, screenSize}: Props) => {
  return (
    <Container width={screenSize}>
      <ImageBackground
        source={{
          uri: image,
        }}>
        <Wrapper>
          <TopContainer>
            <Title numberOfLines={2}>{title}</Title>
            <RatingContainer>
              <RatingText>7.1</RatingText>
              <RatingIcon name="star" />
            </RatingContainer>
          </TopContainer>
          <WatchNowContainer>
            <WatchNowButton>
              <WatchNowButtonText>Watch now</WatchNowButtonText>
            </WatchNowButton>
          </WatchNowContainer>
        </Wrapper>
      </ImageBackground>
    </Container>
  );
};

export default BannerCard;
