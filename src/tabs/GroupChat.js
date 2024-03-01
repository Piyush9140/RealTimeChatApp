import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused, useNavigation} from '@react-navigation/native';
let id = '';
const GroupChat = () => {
  const navigation = useNavigation();
  useEffect(() => {
    getUsers();
  }, []);
  const getUsers = async () => {
    id = await AsyncStorage.getItem('USERID');
    let tempData = [];
    const email = await AsyncStorage.getItem('EMAIL');
    firestore()
      .collection('users')
      .get()
      .then(res => {
        if (res.docs != []) {
          res.docs.map(item => {
            tempData.push(item.data());
          });
        }
      });
  };
  return (
        <View style={styles.container}>
      <TouchableOpacity
        style={[styles.userItem, {backgroundColor: 'white'}]}
        onPress={() => {
          navigation.navigate('Chat2', { id: id});
        }}>
        <Image source={require('../images/user.png')} style={styles.userIcon} />
        <Text>Group chat</Text>
      </TouchableOpacity>
      </View>
      );
};

export default GroupChat;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userItem: {
    width: Dimensions.get('window').width - 50,
    alignSelf: 'center',
    marginTop: 20,
    flexDirection: 'row',
    height: 60,
    borderWidth: 0.5,
    borderRadius: 10,
    paddingLeft: 20,
    alignItems: 'center',
  },
  userIcon: {
    width: 40,
    height: 40,
  },
  name: {color: 'black', marginLeft: 20, fontSize: 20},
});
