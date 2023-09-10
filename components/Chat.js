import { useEffect, useState } from "react";
import { StyleSheet, View, KeyboardAvoidingView } from "react-native";
import { Bubble, GiftedChat } from "react-native-gifted-chat";

const Chat = ({ route, navigation }) => {

    const [messages, setMessages] = useState([]);

    const { name, color } = route.params;

    const onSend = (newMessages) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
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
        navigation.setOptions({ title: name });
        setMessages([
            {
                _id: 1,
                text: `Hey ${name}! Welcome to the chat.`,
                createdAt: new Date(),
                use: {
                    _id: 2,
                    name: "React Native",
                    avatar: "https://dummyimage.com/140x140/000/fff",
                },
            },
            {
                _id: 2,
                text: `${name} has entered the chat!`,
                createdAt: new Date(),
                system: true,
            },
        ]);
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: color }]}>
            <GiftedChat
                messages={messages}
                renderBubble={renderBubble}
                onSend={messages => onSend(messages)}
                user={{
                    _id: 1
                }}
            />
            {Platform.OS === "android" ? <KeyboardAvoidingView behavior="height" /> : null}
            {Platform.OS === "ios" ? <KeyboardAvoidingView behavior="padding" /> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Chat;