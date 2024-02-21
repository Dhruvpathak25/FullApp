import React, {useEffect, useRef} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import HomeTab from '../screens/HomeTab';
import DiscoverTab from '../screens/DiscoverTab';
import ChatTab from '../screens/ChatTab';
import MoreTab from '../screens/MoreTab';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';

const TabArr = [
  {
    route: 'Home',
    label: 'Home',
    icon: 'crown',
    type: Icon,
    component: HomeTab,
  },
  {
    route: 'Discover',
    label: 'Discover',
    icon: 'search',
    type: FontAwesome,
    component: DiscoverTab,
  },
  {
    route: 'Chat',
    label: 'Chat',
    icon: 'message-square',
    type: Feather,
    component: ChatTab,
  },
  {
    route: 'Menu',
    label: 'Menu',
    icon: 'menu',
    type: Entypo,
    component: MoreTab,
  },
];

const Tab = createBottomTabNavigator();

const TabButton = props => {
  const {item, onPress, accessibilityState} = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const textViewRef = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate({0: {scale: 0}, 1: {scale: 1}});
      textViewRef.current.animate({0: {scale: 0}, 1: {scale: 1}});
    } else {
      viewRef.current.animate({0: {scale: 1}, 1: {scale: 0}});
      textViewRef.current.animate({0: {scale: 1}, 1: {scale: 0}});
    }
  }, [focused]);

  const renderIcon = () => {
    const IconComponent = item.type;
    return (
      <IconComponent
        name={item.icon}
        size={30}
        color={focused ? 'black' : 'white'}
      />
    );
  };
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={[styles.container, {flex: focused ? 1 : 0.65}]}>
      <View>
        <Animatable.View
          ref={viewRef}
          style={[
            StyleSheet.absoluteFillObject,
            {backgroundColor: focused ? 'white' : 'black', borderRadius: 25},
          ]}
        />
        <View style={[styles.btn, {backgroundColor: 'transparent'}]}>
          {renderIcon()}
          <Animatable.View ref={textViewRef}>
            {focused && (
              <Text style={{color: 'black', paddingHorizontal: 22}}>
                {item.label}
              </Text>
            )}
          </Animatable.View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 110,
          position: 'absolute',
          bottom: 0,
          right: 0,
          left: 0,
          borderRadius: 0,
          backgroundColor: '#000',
        },
      }}>
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: props => <TabButton {...props} item={item} />,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 20,
  },
});

export default BottomTabNavigator;
