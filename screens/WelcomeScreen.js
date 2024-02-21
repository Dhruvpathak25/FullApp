import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Button from '../components/Button';

const WelcomeScreen = ({navigation}) => {
  const handleNext = () => {
    navigation.navigate('Login');
  };

  const nextButtonStyle = {
    backgroundColor: '#5c39a8',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: 200,
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Let's Get Started!</Text>
      <Image
        source={require('../assets/images/welcome.png')}
        style={styles.image}
      />
      <Button nextbutton style={[styles.button]} onPress={handleNext}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6a9e95',
  },
  title: {
    fontSize: 40,
    fontWeight: '800',
    color: '#fff',
    fontFamily: 'DaysOne-Regular',
  },
  image: {
    width: 300,
    height: 300,
    paddingTop: 650,
    objectFit: 'contain',
  },
  button: {
    color: 'white',
    textAlign: 'center',
  },
});

export default WelcomeScreen;
