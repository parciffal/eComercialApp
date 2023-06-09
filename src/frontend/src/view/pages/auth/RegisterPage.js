import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { user_register } from '../../../api/user_api';
import COLORS from '../../../consts/colors';

const RegisterPage = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleRegister = async () => {
    // Basic validation
    if (!username || !password1 || !password2 || !email || !firstName || !lastName) {
      console.log('Please fill in all fields');
      return;
    }

    if (password1 !== password2) {
      console.log('Passwords do not match');
      return;
    }
    await user_register({
        username: username,
        password1: password1,
        password2: password2,
        email: email,
        first_name: firstName,
        last_name: lastName,
      }).then( response => {
        console.log(response.status)
        if(response.status == 201 ){
            AsyncStorage.setItem('AccessToken', response.data.access);
            AsyncStorage.setItem('RefreshToken', response.data.refresh);
            navigation.navigate('Home');
        }
      }).catch(err => {
        console.log('Register failed:', err);
      })
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor={COLORS.dark}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholderTextColor={COLORS.dark}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(text) => setPassword1(text)}
        value={password1}
      />
      <TextInput
        style={styles.input}
        placeholderTextColor={COLORS.dark}
        placeholder="Confirm Password"
        secureTextEntry={true}
        onChangeText={(text) => setPassword2(text)}
        value={password2}
      />
      <TextInput
        style={styles.input}
        placeholderTextColor={COLORS.dark}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholderTextColor={COLORS.dark}
        placeholder="First Name"
        onChangeText={(text) => setFirstName(text)}
        value={firstName}
      />
      <TextInput
        style={styles.input}
        placeholderTextColor={COLORS.dark}
        placeholder="Last Name"
        onChangeText={(text) => setLastName(text)}
        value={lastName}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    padding: 40,
    color: COLORS.green,
    fontSize: 40
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    color: COLORS.dark,
    marginBottom: 12,
    paddingLeft: 8,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RegisterPage;
