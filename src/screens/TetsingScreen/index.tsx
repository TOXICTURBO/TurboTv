import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Dropdown} from '../../components';
import {DropdownData} from '../../@types';
import {AiringSchedule} from '../../utils/TestData';

import {Circle, Svg} from 'react-native-svg';
import {helpers} from '../../utils';

// const TestingScreen = () => {
//   type DataType = DropdownData<string, string>;
//   const [selected, setSelected] = React.useState<DataType | undefined>(
//     undefined,
//   );
//   const data: DataType[] = [
//     {
//       label: 'gogoanime',
//       value: '1',
//       image:
//         'https://play-lh.googleusercontent.com/MaGEiAEhNHAJXcXKzqTNgxqRmhuKB1rCUgb15UrN_mWUNRnLpO5T1qja64oRasO7mn0',
//     },
//     {
//       label: '9Anime',
//       value: '1',
//       image:
//         'https://d1nxzqpcg2bym0.cloudfront.net/google_play/com.my.nineanime/87b2fe48-9c36-11eb-8292-21241b1c199b/128x128',
//     },
//     {
//       label: 'KickAssAnime',
//       value: '1',
//       image: 'https://kickassanime.am/_nuxt/icons/icon_512x512.95dc24.png',
//     },
//     {
//       label: 'gogoanime',
//       value: '1',
//       image:
//         'https://play-lh.googleusercontent.com/MaGEiAEhNHAJXcXKzqTNgxqRmhuKB1rCUgb15UrN_mWUNRnLpO5T1qja64oRasO7mn0',
//     },
//   ];
//   return (
//     <View
//       style={{
//         width: 300,
//       }}>
//       <Dropdown label="tets" data={data} onSelect={setSelected} />
//     </View>
//   );
// };

const TestingScreen: React.FC = () => {
  const [selectedDay, setSelectedDay] = React.useState<any>(null);

  const {results} = AiringSchedule;
  const formatted = helpers.structureAiringSchedule(results);

  React.useEffect(() => {
    // Set the default day to the first available day
    const firstMonth = Object.keys(formatted[Object.keys(formatted)[0]])[0];
    const firstDay = Object.keys(
      formatted[Object.keys(formatted)[0]][firstMonth],
    )[0];
    setSelectedDay(firstDay);
  }, []);

  return (
    <View>
      {Object.entries(formatted).map(([year, months]) => (
        <View key={year}>
          {Object.entries(months).map(([month, days]) => (
            <View key={month}>
              <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                {Object.entries(days).map(([day, animeList]) => (
                  <TouchableOpacity
                    key={day}
                    style={{
                      padding: 10,
                      backgroundColor:
                        selectedDay === day ? 'green' : 'transparent',
                      borderRadius: 5,
                      marginRight: 10,
                      marginBottom: 10,
                    }}
                    onPress={() => setSelectedDay(day)}>
                    <Text style={{fontSize: 14, fontWeight: 'bold'}}>
                      {day}/{month}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              {selectedDay === null || selectedDay in days ? (
                <View>
                  {selectedDay !== null &&
                    days[selectedDay].map(anime => (
                      <View key={anime.id}>
                        <Text>Title: {anime.title.userPreferred}</Text>
                        {/* Render other anime details as needed */}
                      </View>
                    ))}
                </View>
              ) : (
                <Text>Select a day to view anime</Text>
              )}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

export default TestingScreen;
