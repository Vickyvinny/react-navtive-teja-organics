import { Alert, Platform } from 'react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import { PermissionsAndroid } from 'react-native';

export const LocalNotification = async (otp: string): Promise<void> => {
  try {
    if (Platform.OS === 'ios') {
      const granted = await PushNotificationIOS.requestPermissions();
      if (!granted) {
        Alert.alert('Notification permission denied');
        return;
      }
    } else if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );

      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Notification permission denied');
        return;
      }
    }

    const key = Date.now().toString();
    if (Platform.OS === 'android') {
      PushNotification.createChannel(
        {
          channelId: key,
          channelName: "Local Message",
          channelDescription: "Notification for Local message",
          importance: 4,
          vibrate: true,
        },
        (created) => console.log(`createChannel returned '${created}'`)
      );
    }

    PushNotification.localNotification({
      channelId: key,
      title: 'Your OTP Code',
      message: `Your OTP code is: ${otp}`,
    });
  } catch (error) {
    Alert.alert('Failed to display notification', 'Please try again later.');
  }
};
