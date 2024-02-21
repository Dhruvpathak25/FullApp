import React from 'react';
import {TouchableOpacity} from 'react-native';
import BottomTabNavigator from '../components/BottomTabNavigator';
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeScreen = ({navigation}) => {
  const renderSearchButton = () => (
    <TouchableOpacity
      style={{marginRight: 10}}
      onPress={() => {
        navigation.navigate('Search');
      }}>
      <Icon name="search" size={24} color="black" />
    </TouchableOpacity>
  );

  return <BottomTabNavigator />;
};

export default HomeScreen;
