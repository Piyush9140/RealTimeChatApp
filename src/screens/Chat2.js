import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const Chat2 = () => {
  const route = useRoute();
  const userId = route.params.id;

  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('globalChat')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const messages = querySnapshot.docs.map(doc => {
          const firebaseData = doc.data();
          const data = {
            _id: doc.id,
            text: '',
            ...firebaseData
          };
          return data;
        });
        setMessageList(messages);
      });

    return () => subscriber();
  }, []);

  const onSend = useCallback((messages = []) => {
    firestore()
      .collection('globalChat')
      .add(messages[0]);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        messages={messageList}
        onSend={messages => onSend(messages)}
        user={{
          _id: userId,
        }}
      />
    </View>
  );
};

export default Chat2;
