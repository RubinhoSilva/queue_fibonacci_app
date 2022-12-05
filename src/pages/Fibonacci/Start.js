import { Button, TextInput, View, StyleSheet, Platform } from 'react-native';
import React, {useState } from 'react';
import api from '../../services/api';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';

import {
  ALL_FIBONACCI
} from '../../routes/pathName';

export function Start() {
    const [order, setOrder] = useState(0);
    const [maxSeconds, setMaxSeconds] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const navigation = useNavigation();

    const onChangeOrderlHandler = (order) => {
        setOrder(order);
    };

    const onChangeMaxSecondsHandler = (maxSeconds) => {
        setMaxSeconds(maxSeconds);
    };

    const onStartHandler = async () => {
        if (order <= 0) {
          alert("Order is invalid");
          return;
        }

        if (maxSeconds <= 0) {
            alert("Max Seconds is invalid");
            return;
        }

        setIsLoading(true);
        try {
          const token = await SecureStore.getItemAsync('token');
            const response = await api.post('/fibonacci/start', {
                order: order,
                max_seconds: maxSeconds,
                headers: {
                  'Authorization': `Bearer ${token}` 
              }
            });

          if (response.status === 201) {

            alert("Started...");

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
          keyboardType = 'numeric'
          returnKeyType={(Platform.OS === 'ios') ? 'done' : 'next'}
          onChangeText={onChangeOrderlHandler}
          placeholder={'Order'}
          style={styles.input}
        />
        <TextInput
          keyboardType = 'numeric'
          returnKeyType={(Platform.OS === 'ios') ? 'done' : 'next'}
          onChangeText={onChangeMaxSecondsHandler}
          placeholder={'Max Seconds'}
          style={styles.input}
        />
        
        <Button
          title={'Start'}
          style={styles.input}
          onPress={onStartHandler}
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