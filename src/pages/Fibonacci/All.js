import { Button, Text, View, StyleSheet, ActivityIndicator, SafeAreaView, FlatList } from 'react-native';
import React, {useState, useEffect} from 'react';
import api from '../../services/api';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

import {
    START_FIBONACCI
  } from '../../routes/pathName';

export function All() {
    const [isLoading, setIsLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [offset, setOffset] = useState(1);
    const [isListEnd, setIsListEnd] = useState(false);

    const navigation = useNavigation();

    useEffect(() => getData(), []);

    const onStartHandler = () => {
        navigation.navigate(START_FIBONACCI);
    }; 

    const getData = async () => {
        try {
            console.log(offset);
            if (!isLoading && !isListEnd) {
                console.log('getData');
                setIsLoading(true);

                const token = await SecureStore.getItemAsync('token');
                const response = await api.get('/fibonacci', {
                    params: {
                        page: offset
                    },
                    headers: {
                        'Authorization': `Bearer ${token}` 
                    }
                });

                if (response.status === 200){
                    setOffset(offset + 1);
                    setDataSource([...dataSource, ...response.data.data]);
                    setIsLoading(false);                    
                        
                    if (response.data.next_page_url == null) {
                        setIsListEnd(true);
                    }
                }
            }
        } catch (error) {
            console.log(error)
            alert("An error has occurred");
            setIsLoading(false);
        }
    }; 

    const renderFooter = () => {
        return (
          <View style={styles.footer}>
            {isLoading ? (
              <ActivityIndicator color="black" style={{ margin: 15 }} />
            ) : null}
          </View>
        );
    };

    const ItemView = ({ item }) => {
        return (
          <Text style={styles.itemStyle} onPress={() => getItem(item)}>
            Order {item.order}
          </Text>
        );
    };

    const ItemSeparatorView = () => {
        return (
          <View
            style={{
              height: 0.5,
              width: '100%',
              backgroundColor: '#C8C8C8',
            }}
          />
        );
    };

    const getItem = (item) => {
        let accepted = item.accepted ? 'YES' : 'NOT';
        alert('Order: ' + item.order + ' Value : ' + item.value + ' Accepted: ' + accepted);
    };

    return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={dataSource}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={ItemView}
        ListFooterComponent={renderFooter}
        onEndReached={getData}
        onEndReachedThreshold={0.5}
      />
      <Button
          title={'New Start Fibonacci'}
          style={styles.input}
          onPress={onStartHandler}
        />
    </SafeAreaView>
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