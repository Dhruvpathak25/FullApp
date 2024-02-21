import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Avatar, Drawer} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DrawerContent = ({navigation, state}) => {
  const [fullName, setFullName] = useState('');

  const isScreenSelected = routeName =>
    state.routes[state.index].name === routeName;

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('userData');
      if (value !== null) {
        const Obj = JSON.parse(value);
        setFullName(Obj[0].fullName);
        console.log('full nma e--->>>', Obj[0].fullName);
      }
    } catch (e) {}
  };
  const renderDrawerItem = (label, iconName, routeName) => (
    <DrawerItem
      label={label}
      icon={({color, size}) => (
        <AntDesign
          name={iconName}
          size={size}
          color={isScreenSelected(routeName) ? 'white' : '#A2A2A2'}
        />
      )}
      labelStyle={{color: isScreenSelected(routeName) ? 'white' : '#A2A2A2'}}
      onPress={() => navigation.navigate(routeName)}
    />
  );

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: () => {
            setFullName('');

            navigation.navigate('Login');
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#2b2b2b'}}>
      <DrawerContentScrollView>
        <View style={{alignItems: 'center', marginVertical: 20}}>
          <Avatar.Image
            size={120}
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5TKAVXZ-a1o9dYiw4U1-wHc98si3Jq_ykiw&usqp=CAU',
            }}
          />
          <Text
            style={{
              marginTop: 10,
              fontSize: 20,
              fontWeight: 'bold',
              color: 'white',
            }}>
            {fullName}
          </Text>
        </View>

        <Drawer.Section>
          {renderDrawerItem('Home', 'home', 'Home')}
          {renderDrawerItem('Travel', 'compass', 'Travel')}
          {renderDrawerItem('Settings', 'settings', 'Settings')}
          {renderDrawerItem('Help', 'help-circle', 'Help')}
        </Drawer.Section>
      </DrawerContentScrollView>

      <View style={{paddingBottom: 40}}>
        <TouchableOpacity onPress={handleLogout}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 20,
            }}>
            <AntDesign name="log-out" size={24} color="white" />
            <Text style={{marginLeft: 15, fontSize: 16, color: 'white'}}>
              Logout
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DrawerContent;
