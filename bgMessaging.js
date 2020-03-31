// @flow
// Optional flow type
import type { RemoteMessage } from 'react-native-firebase';

export default async (message: RemoteMessage) => {
    // handle your message
    console.log("mensaje desde task: "+message);
    return Promise.resolve();
}