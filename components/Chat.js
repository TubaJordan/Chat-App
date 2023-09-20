import { addDoc, collection, orderBy, query, onSnapshot, where, DocumentSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Platform, Alert } from "react-native";
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Chat = ({ route, navigation, db, isConnected }) => {

    const [messages, setMessages] = useState([]);

    const { name, color, userID } = route.params;

    const onSend = (newMessages) => {
        addDoc(collection(db, "messages"), newMessages[0])
    }

    const renderBubble = (props) => {
        return <Bubble
            {...props}
            wrapperStyle={{
                right: {
                    backgroundColor: "#8c74a8"
                },
                left: {
                    backgroundColor: "#f2f2f2"
                },
            }}
        />
    }

    let unsubMessage;
    useEffect(() => {

        if (isConnected === true) {

            if (unsubMessage) unsubMessage();
            unsubMessage = null;

            const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
            unsubMessage = onSnapshot(q, (documentsSnapshot) => {
                let msgLists = [];
                documentsSnapshot.forEach(doc => {
                    msgLists.push({
                        id: doc.id,
                        ...doc.data(),
                        createdAt: new Date(doc.data().createdAt.toMillis()),
                    });
                });
                cacheMessages(msgLists);
                setMessages(msgLists);
            });
        } else loadCachedMsg();

        return () => {
            if (unsubMessage) unsubMessage();
        }
    }, [isConnected]);

    const cacheMessages = async (msgToCache) => {
        try {
            await AsyncStorage.setItem("messages_list", JSON.stringify(msgToCache));
        } catch (error) {
            console.log(error.message)
        }
    }

    const loadCachedMsg = async () => {
        const cachedMsg = await AsyncStorage.getItem("messages_list") || [];
        setMessages(JSON.parse(cachedMsg));
    }

    const renderInputToolbar = (props) => {
        if (isConnected) return <InputToolbar {...props} />;
        else return null;
    }


    useEffect(() => {
        navigation.setOptions({ title: name });
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: color }]}>
            <GiftedChat
                messages={messages}
                renderBubble={renderBubble}
                renderInputToolbar={renderInputToolbar}
                onSend={messages => onSend(messages)}
                user={{
                    _id: userID, name
                }}
            />
            {Platform.OS === "android" ? <KeyboardAvoidingView behavior="height" /> : null}
            {/* {Platform.OS === "ios" ? <KeyboardAvoidingView behavior="padding" /> : null} */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Chat;