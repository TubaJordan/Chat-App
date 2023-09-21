import Start from "./components/Start";
import Chat from "./components/Chat";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from "firebase/app";
import { initializeFirestore, disableNetwork, enableNetwork } from "firebase/firestore";
import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect } from "react";
import { Alert } from "react-native";
import { getStorage } from "firebase/storage";

const Stack = createNativeStackNavigator();

const App = () => {

  const connectionStatus = useNetInfo();

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  const firebaseConfig = {
    apiKey: "AIzaSyDyv4WhpQ_67OyaqtGofNN-Io9sho75ris",
    authDomain: "chat-app-b12eb.firebaseapp.com",
    projectId: "chat-app-b12eb",
    storageBucket: "chat-app-b12eb.appspot.com",
    messagingSenderId: "454869258153",
    appId: "1:454869258153:web:a308025158dc2f1d3e3eb8"
  };

  const app = initializeApp(firebaseConfig);
  const db = initializeFirestore(app, { experimentalAutoDetectLongPolling: true }) //workaround for android emulator
  const storage = getStorage(app);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {props => <Chat
            isConnected={connectionStatus.isConnected}
            db={db}
            storage={storage}
            {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;