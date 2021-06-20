/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import React from 'react';
import {Provider} from 'react-redux';
import {name as appName} from './app.json';
import {setImmortal, store} from './store';
import RNAndroidNotificationListener, {
  RNAndroidNotificationListenerHeadlessJsName,
} from 'react-native-android-notification-listener';
import {setGlobal} from 'reactn';
import ReactNativeAN from 'react-native-alarm-notification';

setGlobal({
  listenerId: -1,
  notiId: 1,
});

const status = async () => {
  const tmp = await RNAndroidNotificationListener.getPermissionStatus();
  if (tmp == 'denied') RNAndroidNotificationListener.requestPermission();
};

status();

const MyHeadlessTask = async () => {};

const headlessNotificationListener = async ({notification}) => {
  notification = JSON.parse(notification);

  if (
    notification &&
    notification.title == 'ILUNA' &&
    notification.text !== '알람이 울릴 예정입니다.'
  ) {
    let a = notification.text * 1;
    setGlobal({
      listenerId: a,
    });
    ReactNativeAN.removeAllFiredNotifications();
  }
};

const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerHeadlessTask('Immortal', () => MyHeadlessTask);
AppRegistry.registerHeadlessTask(
  RNAndroidNotificationListenerHeadlessJsName,
  () => headlessNotificationListener,
);
AppRegistry.registerComponent(appName, () => RNRedux);
