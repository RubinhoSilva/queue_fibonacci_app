import { Button, TextInput, View, StyleSheet } from 'react-native';
import React, {useState } from 'react';
import api from '../services/api';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';

import {
  ALL_FIBONACCI
} from '../routes/pathName';

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const navigation = useNavigation();

    const onChangeEmailHandler = (email) => {
        setEmail(email);
    };

    const onChangePasswordHandler = (password) => {
        setPassword(password);
    };

    const onLoginHandler = async () => {
        if (!email.trim()) {
          alert("Email is invalid");
          return;
        }

        if (!password.trim()) {
            alert("Password is invalid");
            return;
        }

        setIsLoading(true);
        try {
            const response = await api.post('/login', {
                email,
                password
            });

          if (response.status === 200) {
            await SecureStore.setItemAsync('token', response.data.data.token);

            alert("Wellcome...");

            navigation.reset({
                index: 0,
                routes: [{name: ALL_FIBONACCI}],
            });

          } else {
            setIsLoading(false);
            throw new Error("An error has occurred");
          }
        } catch (error) {
            console.log(error)
            alert("An error has occurred");
            setIsLoading(false);
        }
    }; 

    return (
        <View style={styles.container}>
        <TextInput
          onChangeText={onChangeEmailHandler}
          placeholder={'Email'}
          style={styles.input}
        />
        <TextInput
          onChangeText={onChangePasswordHandler}
          placeholder={'Password'}
          secureTextEntry={true}
          style={styles.input}
        />
        
        <Button
          title={'Login'}
          style={styles.input}
          onPress={onLoginHandler}
        />
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ecf0f1',
    },
    input: {
      width: 200,
      height: 44,
      padding: 10,
      borderWidth: 1,
      borderColor: 'black',
      marginBottom: 10,
    },
  });