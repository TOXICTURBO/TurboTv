import {rgba} from 'polished';
import LinearGradient from 'react-native-linear-gradient';
import {styled} from 'styled-components/native';

interface ContainerProps {
  width: number;
}

export const Container = styled.TouchableOpacity<ContainerProps>`
  background-color: ${({theme}) => theme.base.mainColor};
  width: ${({width}) => width - 150}px;
  height: 150px;
  border-radius: 15px;
  overflow: hidden;
`;

export const ImageBackground = styled.ImageBackground`
  width: 100%;
  height: 100%;
`;

export const Wrapper = styled(LinearGradient).attrs({
  colors: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.45)'],
  start: {x: 0, y: -0.3},
  end: {x: 0, y: 1},
})`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const BottomBanner = styled.View`
  position: relative;
  height: 38%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
`;

export const BottomBannerText = styled.Text.attrs({
  numberOfLines: 1,
})`
  color: white;
  padding: 0 15px;
  font-family: ${({theme}) => theme.text.fonts.NunitoSans};
  margin-top: 1px;
`;

export const BottomBannerSubText = styled(BottomBannerText)`
  color: ${({theme}) => theme.text.offWhite};
  font-size: 13px;
  margin-top: -1px;
`;

export const PercentWatchedContainer = styled.View`
  width: 100%;
  background-color: ${({theme}) => rgba(theme.base.mainColor, 0.4)};
  height: 5px;
  position: absolute;
  top: 0;
  left: 0;
`;

type PercentWatchedProps = {
  watched_percentage: number;
};

export const PercentWatched = styled.View<PercentWatchedProps>`
  width: ${({watched_percentage}) => watched_percentage}%;
  height: 100%;
  background-color: ${({theme}) => theme.base.mainColor};
`;

export const WhereAmIFromContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  padding: 3px;
  border-bottom-right-radius: 8px;
  background: rgba(0, 0, 0, 1);
`;

export const Image = styled.Image.attrs({
  resizeMode: 'contain',
})`
  width: 20px;
  height: 20px;
`;
