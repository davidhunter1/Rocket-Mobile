import React from 'react';
import Login from './Login';
import EleList from './List';
import Status from './Status';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: "Login" }}
        />
        <Stack.Screen
          name="EleList"
          component={EleList}
          options={{ title: "Elevators List" }}
        />
        <Stack.Screen name="Status" component={Status} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

