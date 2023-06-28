import React, {useState} from 'react';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  HomeScreen,
  InfoScreen,
  ListsScreen,
  SearchScreen,
  SettingsScreen,
  VideoPlayerScreen,
} from '../screens';
import {NavigationBar} from '../components';
import {RootStackParamList} from '../@types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const config = {
  screens: {
    Home: '',
    Search: 'search',
  },
};

const linking = {
  prefixes: ['apolloTv://'],
  config,
};

const AppStack = ({setHiddenStatusBar}: {setHiddenStatusBar: boolean}) => {
  const navigationRef: any = useNavigationContainerRef();
  const [routeNameRef, setRouteNameRef] = useState<any>();

  return (
    <NavigationContainer
      linking={linking}
      ref={navigationRef}
      onReady={() => {
        setRouteNameRef(navigationRef.getCurrentRoute().name);
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.getCurrentRoute().name;

        if (previousRouteName !== currentRouteName) {
          // console.log(currentRouteName);
          // Save the current route name for later comparison
          setRouteNameRef(currentRouteName);
        }
      }}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          animation: 'slide_from_left',
          headerShown: false,
          contentStyle: {
            backgroundColor: '#0f0f0f',
          },
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Lists" component={ListsScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Info" component={InfoScreen} />
        <Stack.Screen name="VideoPlayer" component={VideoPlayerScreen} />
      </Stack.Navigator>
      <NavigationBar
        currentRoute={routeNameRef === undefined ? 'loading' : routeNameRef}
      />
    </NavigationContainer>
  );
};

export default AppStack;
