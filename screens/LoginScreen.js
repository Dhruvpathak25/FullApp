import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import Button from '../components/Button';
import CustomInput from '../components/CustomInput';
import Icon from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleBack = () => {
    navigation.navigate('Welcome');
  };

  const checkCredentials = async () => {
    try {
      const existingUserData = await AsyncStorage.getItem('userData');
      const userList = existingUserData ? JSON.parse(existingUserData) : [];

      const matchedUser = userList.find(
        user => user.email === email && user.password === password,
      );

      if (matchedUser) {
        console.log('Login successful. Navigating to Home.');
        navigation.navigate('Home');
      } else {
        console.log('Invalid credentials. Staying on the login screen.');
        Alert.alert(
          'Invalid credentials',
          'Please check your email and password.',
        );
      }
    } catch (error) {
      console.error('Error retrieving user data from AsyncStorage:', error);
    }
  };

  const validation = () => {
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (!emailRegex.test(email)) {
      setEmailError('Enter valid email address');
      isValid = false;
    }
    if (!passwordRegex.test(password)) {
      setPasswordError(
        'Must be at least 8 characters,at least one uppercase, lowercase and one digit.',
      );
      isValid = false;
    }

    if (isValid) {
      checkCredentials();
    }
  };
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.container}>
          <View style={styles.purpleContainer}>
            <View style={{position: 'absolute', top: 50, left: 30}}>
              <Button onPress={handleBack} withBackIcon />
            </View>
            <Image
              source={require('../assets/images/login.png')}
              style={styles.image}
            />
          </View>

          <View style={styles.whiteContainer}>
            <Text style={styles.title}>Login</Text>

            <CustomInput
              title="Email"
              placeholder="Enter your email"
              value={email}
              onChangeText={text => {
                setEmail(text);
                setEmailError('');
              }}
              error={emailError}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <View style={styles.eyecontainer}>
              <CustomInput
                title="Password"
                placeholder="Enter your password"
                value={password}
                onChangeText={text => {
                  setPassword(text);
                  setPasswordError('');
                }}
                error={passwordError}
                secureTextEntry={!showPassword}
              />
              <Icon
                name={showPassword ? 'eye-with-line' : 'eye'}
                size={24}
                color="#aaa"
                style={styles.icon}
                onPress={toggleShowPassword}
              />
            </View>
            <Button title="Login" onPress={validation} />
          </View>
        </View>
      </KeyboardAvoidingView>
      <SafeAreaView
        style={{
          flex: -1,
          flexDirection: 'row',
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 15,
          padding: -10,
          bottom: '0%',
        }}>
        <Text style={styles.account}>Create Account!</Text>
        <Button title="Sign Up" onPress={() => navigation.navigate('SignUp')} />
      </SafeAreaView>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  purpleContainer: {
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'center',
    backgroundColor: '#6a9e95',
    paddingTop: '20%',
    paddingBottom: 0,
    paddingLeft: 15,
    paddingRight: 10,
  },
  backButton: {
    position: 'absolute',
    top: 100,
    left: 10,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
  },
  image: {
    width: 300,
    height: 300,
    objectFit: 'cover',
    overflow: 'visible',
  },
  whiteContainer: {
    backgroundColor: 'white',
    flex: 1,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 20,
    position: 'absolute',
    bottom: -40,
    left: 0,
    alignItems: 'center',
    width: '100%',
    height: '60%',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'DaysOne-Regular',
  },

  account: {
    fontSize: 20,
    paddingTop: 10,
    fontFamily: 'DaysOne-Regular',
  },
  eyecontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {position: 'absolute', right: 10, top: 40},
});

export default LoginScreen;
