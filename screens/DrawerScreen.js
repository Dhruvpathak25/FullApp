import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import DrawerContent from '../components/DrawerContent';
import SettingsScreen from './SettingsScreen';
import TravelScreen from './TravelScreen';
import HelpScreen from './HelpScreen';

const Drawer = createDrawerNavigator();

const DrawerScreen = () => (
  <Drawer.Navigator
    drawerContent={props => <DrawerContent {...props} />}
    drawerStyle={{
      width: 280, // Width of the drawer
    }}>
    <Drawer.Screen name="Home" component={HomeScreen} />
    <Drawer.Screen name="Travel" component={TravelScreen} />
    <Drawer.Screen name="Settings" component={SettingsScreen} />
    <Drawer.Screen name="Help" component={HelpScreen} />
  </Drawer.Navigator>
);

export default DrawerScreen;
