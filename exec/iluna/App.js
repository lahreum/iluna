import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AlarmDetail from './src/Alarm/AlarmDetail.js';
import AlarmList from './src/Alarm/AlarmList.js';
import AlarmBells from './src/Alarm/AlarmBells.js';
import AlarmMissions from './src/Alarm/AlarmMissions.js';
import MissionCard from './src/Mission/MissionCard';
import MissionMath from './src/Mission/MissionMath';
import MissionPhoto from './src/Mission/MissionPhoto';
import MissionRockPaperScissors from './src/Mission/MissionRockPaperScissors';
import AlarmActivate from './src/Alarm/AlarmActivate';
import AppSetting from './src/AppSetting/AppSetting';
import AppFaq from './src/AppSetting/AppFaq';
import AppInfo from './src/AppSetting/AppInfo';
import OpenSourceLicense from './src/AppSetting/OpenSourceLicense'; Auth
import Auth from './src/AppSetting/Auth';
import SplashScreen from 'react-native-splash-screen';
import Success from './src/components/Success';
import Immortal from './Immortal';

const Stack = createStackNavigator();
class App extends Component {
  componentDidMount() {
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
    SplashScreen.hide();
    Immortal.startService();
  }
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyle: {backgroundColor: '#fff'},
          }}
          initialRouteName="AlarmList">
          <Stack.Screen name="AlarmList" component={AlarmList} />
          <Stack.Screen name="AlarmDetail" component={AlarmDetail} />
          <Stack.Screen name="AlarmBells" component={AlarmBells} />
          <Stack.Screen name="AlarmMissions" component={AlarmMissions} />
          <Stack.Screen name="AlarmActivate" component={AlarmActivate} />
          <Stack.Screen name="Math" component={MissionMath} />
          <Stack.Screen name="Card" component={MissionCard} />
          <Stack.Screen name="Photo" component={MissionPhoto} />
          <Stack.Screen name="RPS" component={MissionRockPaperScissors} />
          <Stack.Screen name="Setting" component={AppSetting} />
          <Stack.Screen name="Faq" component={AppFaq} />
          <Stack.Screen name="Info" component={AppInfo} />
          <Stack.Screen name="OpenSourceLicense" component={OpenSourceLicense} />
          <Stack.Screen name="Auth" component={Auth} />
          <Stack.Screen name="Success" component={Success} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
