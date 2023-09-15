import { addDoc, collection, orderBy, query, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Platform } from "react-native";
import { Bubble, GiftedChat } from "react-native-gifted-chat";

const Chat = ({ route, navigation, db }) => {

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

    useEffect(() => {
        const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
        const unsubMessage = onSnapshot(q, (documentsSnapshot) => {
            let msgLists = [];
            documentsSnapshot.forEach(doc => {
                msgLists.push({
                    id: doc.id,
                    ...doc.data(),
                    createdAt: new Date(doc.data().createdAt.toMillis()),
                });
            });
            setMessages(msgLists);
        });

        return () => {
            if (unsubMessage) unsubMessage();
        }
    }, []);

    useEffect(() => {
        navigation.setOptions({ title: name });
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: color }]}>
            <GiftedChat
                messages={messages}
                renderBubble={renderBubble}
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