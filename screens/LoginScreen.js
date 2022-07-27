import { View, Text } from 'react-native';
import React, { useState } from 'react';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

  return (
    <View>
        {/* <Input
        placeholder = 'Enter your email address' 
        label = 'Email'
        leftIcon = {{ type: 'material', name: 'email' }}
        value = {email}
        onChangeText = {text => setEmail(text)}
        />

        <Input
        placeholder = 'Enter your password' 
        label = 'Password'
        leftIcon = {{ type: 'material', name: 'password' }}
        value = {password}
        onChangeText = {text => setPassword(text)}
        secureTextEntry
        /> */}
    </View>
  )
}

export default LoginScreen