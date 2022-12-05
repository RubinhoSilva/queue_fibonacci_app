import { View, ActivityIndicator } from 'react-native';
import React, {useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';

import {
  LOGIN,
  ALL_FIBONACCI,
} from '../routes/pathName';

export function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigation = useNavigation();

  const getToken = async () => {
      // try {
      const token = await SecureStore.getItemAsync('token');
      console.log(token);

      let newPage = LOGIN;
      if(token != null){
        newPage = ALL_FIBONACCI;
      }

      navigation.reset({
          index: 0,
          routes: [{name: newPage}],
      });
  }; 

  useEffect(() => getToken(), []);

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
}