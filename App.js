/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

// import { registerScreens } from './src/screens';
 // this is where you register all of your app's screens
// LoadTabs();


import { Navigation } from 'react-native-navigation';
import Login from './src/components/Login';
import HomeScreen from './src/components/Home';
import HelloScreen from './src/components/Hello';
import InserirGastosScreen from './src/components/Gastos/Inserir';

Navigation.registerComponent(
  "prototipo.LoginScreen",
  () =>
  Login
);


Navigation.registerComponent(
  "prototipo.HomeScreen",
  () =>
  HomeScreen
);


Navigation.registerComponent(
  "prototipo.HelloScreen",
  () =>
  HelloScreen
);


Navigation.registerComponent(
  "prototipo.Gastos.Inserir",
  () =>
  InserirGastosScreen
);

export default () => {
  Navigation.startSingleScreenApp({
    screen: {
      screen: "prototipo.LoginScreen",
      title: "Login",
      navigatorStyle: {
        navBarHidden: true
      }
    }
  })
}