import { NavigationContainer } from "@react-navigation/native";
import { Stack } from "./Navigation";
import React from "react";
import PermissionScreen from "./xcomponent/XScreen/Permission/PermissionScreen";
import HomeScreen from "./xcomponent/XScreen/HomeScreen";
import QRReaderScreen from "./xcomponent/XScreen/QRReaderScreen";
import PairingScreen from "./xcomponent/XScreen/PairingScreen";
import FileSelectionScreen from "./xcomponent/XScreen/FileSelection/FileSelectionScreen";
import StartServerScreen from "./xcomponent/XScreen/StartServerScreen";
import NoConnectionScreen from "./xcomponent/XScreen/NoConnectionScreen";
import TransferClientScreen from "./xcomponent/XScreen/Transfer/TransferClientScreen";
import TransferServerScreen from "./xcomponent/XScreen/Transfer/TransferServerScreen";
import { TransferoContextProvider } from "./TransferoContext";

global.Buffer = require('buffer').Buffer;

function App() {
  return (
    <TransferoContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false, animation: 'none' }}>
          <Stack.Screen
            name='Permission'
            component={PermissionScreen}
            initialParams={undefined}
          />
          <Stack.Screen
            name='StartServer'
            component={StartServerScreen}
            initialParams={undefined}
          />
          <Stack.Screen
            name='NoConnection'
            component={NoConnectionScreen}
            initialParams={undefined}
          />
          <Stack.Screen
            name='Home'
            component={HomeScreen}
            initialParams={undefined}
          />
          <Stack.Screen
            name='QRReader'
            component={QRReaderScreen}
            initialParams={undefined}
          />
          <Stack.Screen
            name='Pairing'
            component={PairingScreen}
            initialParams={undefined}
          />
          <Stack.Screen
            name='FileSelection'
            component={FileSelectionScreen}
            initialParams={undefined}
          />
          <Stack.Screen
            name='TransferClient'
            component={TransferClientScreen}
            initialParams={undefined}
          />
          <Stack.Screen
            name='TransferServer'
            component={TransferServerScreen}
            initialParams={undefined}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </TransferoContextProvider>
  );
}

export default App;
