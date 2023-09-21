import { addDoc, collection, orderBy, query, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Platform } from "react-native";
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomActions from "./CustomActions";
import MapView from "react-native-maps";

const Chat = ({ route, navigation, db, isConnected, storage }) => {

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

    const renderCustomActions = (props) => {
        return <CustomActions userID={userID} storage={storage} {...props} />
    };

    const renderCustomView = (props) => {
        const { currentMessage } = props;
        if (currentMessage.location) {
            return (
                <MapView
                    style={{
                        width: 250,
                        height: 100,
                        borderRadius: 13,
                        margin: 8,
                    }}
                    region={{
                        latitude: currentMessage.location.latitude,
                        longitude: currentMessage.location.longitude,
                        latitudeDelta: 0.0922,
                        longitude: 0.0421,
                    }}
                />
            );
        }
        return null;
    }

    return (
        <View style={[styles.container, { backgroundColor: color }]}>
            <GiftedChat
                messages={messages}
                renderBubble={renderBubble}
                renderInputToolbar={renderInputToolbar}
                onSend={messages => onSend(messages)}
                renderActions={renderCustomActions}
                renderCustomView={renderCustomView}
                user={{
                    _id: userID, name
                }}
            />
            {Platform.OS === "android" ? <KeyboardAvoidingView behavior="height" /> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Chat;