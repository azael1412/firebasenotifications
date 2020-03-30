// import React from 'react';
// import { Text, View } from 'react-native';
// import firebase from 'react-native-firebase';
// export default class HelloWorldApp extends React.Component{
//   constructor(props){
//     super(props);
//     firebase.auth()
//   .signInAnonymously()
//   .then(credential => {
//     if (credential) {
//       console.log('default app user ->', credential.user.toJSON());
//     }
//   });
//   }
//   render(){
//     return (
//       <View style={{
//           flex: 1,
//           justifyContent: 'center',
//           alignItems: 'center'
//         }}>
//         <Text>Hello, world!</Text>
//       </View>
//     );
//   }

// }
// import React, {Component} from 'react';
// import { AsyncStorage, View, Text, Alert } from 'react-native';
// import firebase from 'react-native-firebase';

// export default class App extends Component {

// async componentDidMount() {
//   this.checkPermission();
//   this.createNotificationListeners(); //add this line
// }

//   //1
// async checkPermission() {
//   const enabled = await firebase.messaging().hasPermission();
//   if (enabled) {
//       this.getToken();
//   } else {
//       this.requestPermission();
//   }
// }

//   //3
// async getToken() {
//   let fcmToken = await AsyncStorage.getItem('fcmToken');
//   if (!fcmToken) {
//       fcmToken = await firebase.messaging().getToken();
//       if (fcmToken) {
//           // user has a device token
//           await AsyncStorage.setItem('fcmToken', fcmToken);
//       }
//   }
// }

//   //2
// async requestPermission() {
//   try {
//       await firebase.messaging().requestPermission();
//       // User has authorised
//       this.getToken();
//   } catch (error) {
//       // User has rejected permissions
//       console.log('permission rejected');
//   }
// }

// ////////////////////// Add these methods //////////////////////
  
//   //Remove listeners allocated in createNotificationListeners()
// componentWillUnmount() {
//   this.notificationListener();
//   this.notificationOpenedListener();
// }

// async createNotificationListeners() {
//   /*
//   * Triggered when a particular notification has been received in foreground
//   * */
//   this.notificationListener = firebase.notifications().onNotification((notification) => {
//       const { title, body } = notification;
//       console.log("abierto:",notification)
//       this.showAlert(title, body);
//   });

//   /*
//   * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
//   * */
//   this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
//       const { title, body } = notificationOpen.notification;
//       console.log("segundo plano: ",notificationOpen);
//       this.showAlert(title, body);
//   });

//   /*
//   * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
//   * */
//   const notificationOpen = await firebase.notifications().getInitialNotification();
//   if (notificationOpen) {
//       const { title, body } = notificationOpen.notification;
//       console.log("si esta cerrado: ",notificationOpen);
//       this.showAlert(title, body);
//   }
//   /*
//   * Triggered for data only payload in foreground
//   * */
//   this.messageListener = firebase.messaging().onMessage((message) => {
//     //process data message
//     console.log(JSON.stringify(message));
//   });
// }

// showAlert(title, body) {
//   Alert.alert(
//     title, body,
//     [
//         { text: 'OK', onPress: () => console.log('OK Pressed') },
//     ],
//     { cancelable: false },
//   );
// }

//   render() {
//     return (
//       <View style={{flex: 1}}>
//         <Text>Welcome to React Native!</Text>
//       </View>
//     );
//   }
// }
import React, {Component} from 'react';
import { AsyncStorage, View, Text, Alert } from 'react-native';
import firebase from 'react-native-firebase';
import type { Notification, NotificationOpen } from 'react-native-firebase';
import {AppRegistry} from 'react-native';
import bgMessaging from './bgMessaging'; // <-- Import the file you created in (2)
       // New task registration
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging); // <-- Add this line
export default class App extends Component {

async componentDidMount() {
  this.checkPermission();
  this.createNotificationListeners(); //add this line
}

  //1
async checkPermission() {
  const enabled = await firebase.messaging().hasPermission();
  if (enabled) {
      this.getToken();
  } else {
      this.requestPermission();
  }
}

  //3
async getToken() {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
          // user has a device token
          await AsyncStorage.setItem('fcmToken', fcmToken);
      }
  }
}

  //2
async requestPermission() {
  try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
  } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
  }
}
////////////////////// Add these methods //////////////////////
  
  //Remove listeners allocated in createNotificationListeners()
  componentWillUnmount() {
    this.notificationListener();
    //this.notificationOpenedListener();
    this.removeNotificationOpenedListener();
    this.messageListener();
  }
  
  async createNotificationListeners() {
    /*
    * Triggered when a particular notification has been received in foreground
    * */
    this.notificationListener = firebase.notifications().onNotification((notification) => {
        const { title, body } = notification;
        console.log("----------abierto-------------------")
        console.log(notification);
        this.showAlert(title, body);
    });
  
    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */

   this.removeNotificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
    // Get the action triggered by the notification being opened
    const action = notificationOpen.action;
    console.log("action: ",action)
    // Get information about the notification that was opened
    const notification: Notification = notificationOpen.notification;
    console.log("notification: ",notification)
    });
    /*this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
        const { title, body } = notificationOpen.notification;
        console.log("----------segundo plano--------------------")
        console.log(notificationOpen);
        this.showAlert(title, body);
    });*/

  
    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    /*const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
        const { title, body } = notificationOpen.notification;
        console.log("----------cerrado--------------------")
        console.log(notificationOpen);
        this.showAlert(title, body);
    }*/
    /*
    * Triggered for data only payload in foreground
    * */
    this.messageListener = firebase.messaging().onMessage((message) => {
      //process data message
      console.log(JSON.stringify(message));
    });
  }
  
  showAlert(title, body) {
    Alert.alert(
      title, body,
      [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Text>Welcome to React Native!</Text>
      </View>
    );
  }
}