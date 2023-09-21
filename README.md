# Chat App

This is a mobile chat application developed using React Native. It allows users to engage in text conversations, share images, capture photos, and send their current location.

## Key Features

- **User Authentication:** Users are able to select their username and preferred color scheme.
- **Chat Screen:** Display all conversations with an input field and submit button.
- **Image Sharing:** Users can send photos from their camera or image library on their devices.
- **Location Sharing:** Users have the ability to share their geographic location with others.
- **Online & Offline Storage:** Messages, photots, and geolocations are stored in Google Firestore Database that are cached if the app loses connection to the internet.

## Screenshots

![Start Screen](assets/StartScreen.png | width=100px)
![Chat Screen](assets/ChatScreen.png | width=100px)

## Prerequisites

Before setting up the application, ensure you have the following:
- Node.js
- Firebase Account
- Expo
- Mobile OS Emulator (such as Android Studio) and/or
- Personal mobile device (smartphone, tablet, etc.)

## Installation and Setup Instructions

### General Steps
1. Clone the repository.
2. Open the terminal and navigate to your project directory.
3. Run 'npm install 16.19.0' to install the required base dependencies.
4. Execute 'npm use 16.19.0'.
5. Install Firebase by running 'npm i firebase'.
6. Install Expo using 'npm i expo'.
7. To avoid image-related issues, install 'whatwg-fetch' version 3.6.2 with 'npm i whatwg-fetch@3.6.2'.
8. Sing up for Firebase and complete the setup (instructions below).
9. Download and install Android Studio (instructions below).
10. Sign up for Expo and install Expo Go on your mobile devices (instructions below).
11. In your terminal, run 'expo login' and complete the login process.
12. For future use, run 'npx expo start' in the terminal.

### Firebase Setup

1. Visit 'https://firebase.google.com/'.
2. Access the console by clicking 'Go To Console' in the top right corner.
3. Create a new project.
4. Once inside the project, go to 'Build -> Firestore Database' on the left side of the screen under product categories.
5. Create a Firestore Database, select production mode, proceed with the setup, and enable it.
6. In Firestore Database, go to rules and change 'allow read, write: if false;' to 'allow read, write: if true;' then publish.
7. Navigate to 'Project Settings -> General'.
8. Under 'Your apps,' select the web app (</>) option.
9. Choose a nickname (Firebase Hosting setup is optional) and follow the prompts.
10. Copy the code section starting with 'const firebaseConfig =' and replace the existing code in App.js with it.

### Android Studio Setup

1. Visit 'https://developer.android.com/studio'.
2. Download Android Studio Giraffe.
3. Follow the installation process.
4. After installation, launch Android Studio, and go to 'More Actions -> Virtual Device Manager'.
5. Set up and install your preferred virtual device (for this project, the Pixel 7 Pro was used).

### Expo Setup

1. Visit 'https://expo.dev/'.
2. Create your Expo account.
3. Open the virtual device you set up with Android Studio.
4. Go to the Google Play Store, install Expo Go, and log in.
5. Repeat the installation and login steps on your physical mobile device for testing.