import { StyleSheet, View, Text, TextInput, ImageBackground, TouchableOpacity, ScrollView, KeyboardAvoidingView, Image, Platform, Alert } from "react-native";
import { useState } from "react";
import { getAuth, signInAnonymously } from "firebase/auth";

const image = require("../assets/Background-Image.png");
const userBackgroundColors = {
    a: "#090C08",
    b: "#474056",
    c: "#8A95A5",
    d: "#B9C6AE",
};

const Start = ({ navigation }) => {

    const auth = getAuth();

    const signInUser = () => {
        signInAnonymously(auth)
            .then(result => {
                navigation.navigate("Chat", { userID: result.user.uid, name: name, color: color });
                Alert.alert("Sign in Successfully!");
            })
            .catch((error) => {
                console.error("Unable to sign in", error);
                Alert.alert("Unable to sign in, try again later.");
            })
    }

    const [name, setName] = useState("");
    const [color, setColor] = useState(userBackgroundColors.a);

    return (
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.appTitle}>Chat App</Text>
                <View style={styles.inputContainer}>
                    <KeyboardAvoidingView style={styles.inputContainer} behavior="padding" enabled>
                        <View style={styles.sectionStyle}>
                            <Image styles={styles.imageStyle} source={require("../assets/icon.png")} />
                            <TextInput style={styles.textInput} value={name} onChangeText={setName} placeholder="Your Name" placeholderTextColor="#757083" />
                        </View>
                        <Text style={styles.textColorSelector}>Choose Background Color:</Text>
                        <View style={styles.colorSelector}>
                            <TouchableOpacity style={[styles.circle, color === userBackgroundColors.a && styles.selectedCircle1, { backgroundColor: userBackgroundColors.a },]} onPress={() => setColor(userBackgroundColors.a)}></TouchableOpacity>
                            <TouchableOpacity style={[styles.circle, color === userBackgroundColors.b && styles.selectedCircle2, { backgroundColor: userBackgroundColors.b },]} onPress={() => setColor(userBackgroundColors.b)}></TouchableOpacity>
                            <TouchableOpacity style={[styles.circle, color === userBackgroundColors.c && styles.selectedCircle3, { backgroundColor: userBackgroundColors.c },]} onPress={() => setColor(userBackgroundColors.c)}></TouchableOpacity>
                            <TouchableOpacity style={[styles.circle, color === userBackgroundColors.d && styles.selectedCircle4, { backgroundColor: userBackgroundColors.d },]} onPress={() => setColor(userBackgroundColors.d)}></TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                    <TouchableOpacity style={styles.button} onPress={signInUser}>
                        <Text style={styles.buttonText}>Start Chatting</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            {Platform.OS === "android" ? <KeyboardAvoidingView behavior="height" /> : null}
            {Platform.OS === "ios" ? <KeyboardAvoidingView behavior="padding" /> : null}
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    image: {
        flex: 1,
        justifyContent: 'space-between',
        padding: '6%',
    },
    appTitle: {
        fontSize: 45,
        fontWeight: '600',
        color: '#FFFFFF',
        alignSelf: 'center',
        flex: 1,
        paddingTop: 55,
    },
    inputContainer: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: "6%",
        paddingBottom: 20,
    },
    textColorSelector: {
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',
        opacity: 1,
        marginBottom: 15,
    },
    colorSelector: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 40,
    },
    circle: {
        height: 50,
        width: 50,
        borderRadius: 25,
    },
    selectedCircle1: {
        borderWidth: 5,
        borderColor: "#445544",
    },
    selectedCircle2: {
        borderWidth: 5,
        borderColor: "#7A6B89",
    },
    selectedCircle3: {
        borderWidth: 5,
        borderColor: "#BDC3C7",
    },
    selectedCircle4: {
        borderWidth: 5,
        borderColor: "#D0D9B2",
    },
    button: {
        backgroundColor: '#757083',
        padding: 15,
        position: "fixed",
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: '600',
        textAlign: 'center',
        fontSize: 16,
    },
    textInput: {
        flex: 1,
        padding: 15,
        fontSize: 16,
        fontWeight: "300",
        color: "#757083",
        opacity: 0.5
    },
    sectionStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
        borderWidth: 2,
        borderColor: "#757083",
        borderRadius: 2,
        marginTop: 20,
        marginBottom: 25,
        marginHorizontal: -20,
    },
    imageStyle: {
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
        alignItems: 'center',
    },
});

export default Start;