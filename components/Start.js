import { StyleSheet, View, Text, Button, TextInput, ImageBackground, TouchableOpacity, ScrollView, KeyboardAvoidingView } from "react-native";
import { useState } from "react";

const image = require("../assets/Background-Image.png");

const userBackgroundColors = {
    a: "#090C08",
    b: "#474056",
    c: "#8A95A5",
    d: "#B9C6AE",
};


const Start = ({ navigation }) => {

    const [name, setName] = useState("");
    const [color, setColor] = useState(userBackgroundColors.a);


    return (
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.appTitle}>Chat App</Text>
                <View style={styles.inputContainer}>
                    <KeyboardAvoidingView style={styles.inputContainer} behavior="padding" enabled>
                        <TextInput style={styles.textInput} value={name} onChangeText={setName} placeholder="Your Name" placeholderTextColor="#757083" />
                        <Text style={styles.textColorSelector}>Choose Background Color:</Text>
                        <View style={styles.colorSelector}>
                            <TouchableOpacity style={[styles.circle, color === userBackgroundColors.a && styles.selectedCircle1, { backgroundColor: userBackgroundColors.a },]} onPress={() => setColor(userBackgroundColors.a)}></TouchableOpacity>
                            <TouchableOpacity style={[styles.circle, color === userBackgroundColors.b && styles.selectedCircle2, { backgroundColor: userBackgroundColors.b },]} onPress={() => setColor(userBackgroundColors.b)}></TouchableOpacity>
                            <TouchableOpacity style={[styles.circle, color === userBackgroundColors.c && styles.selectedCircle3, { backgroundColor: userBackgroundColors.c },]} onPress={() => setColor(userBackgroundColors.c)}></TouchableOpacity>
                            <TouchableOpacity style={[styles.circle, color === userBackgroundColors.d && styles.selectedCircle4, { backgroundColor: userBackgroundColors.d },]} onPress={() => setColor(userBackgroundColors.d)}></TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Screen2", { name: name, color: color })}>
                        <Text style={styles.buttonText}>Start Chatting</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
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
    textInput: {
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',
        padding: 15,
        borderWidth: 2,
        borderColor: '#757083',
        marginTop: 20,
        marginBottom: 25,
        marginHorizontal: -20,
    },
    textColorSelector: {
        fontSize: 16,
        fontWeight: '300',
        color: '#8A95A5',
        marginBottom: 10,
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
});

export default Start;