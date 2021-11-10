import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import firebase from "firebase";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import LektionsPlan from "./Components/LektionsPlan";
import Ændre from "./Components/Ændre";
import Detaljer from "./Components/Detaljer";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Card } from 'react-native-paper';
import SignUpForm from "./Components/SignUpForm";
import LoginForm from "./Components/LoginForm";
import LogOut from "./Components/LogOut";
import Profil from "./Components/Profil";
import AntDesign from "react-native-vector-icons/AntDesign";



export default function App() {

    const [user, setUser] = useState({loggedIn: false});

    const Stack = createStackNavigator();
    const Tab = createBottomTabNavigator();

    const firebaseConfig = {
        apiKey: "AIzaSyChMwggtdtvasqAcsDQoGhFIHcGp5OKbZI",
        authDomain: "lektionsplanen.firebaseapp.com",
        databaseURL: "https://lektionsplanen-default-rtdb.firebaseio.com",
        projectId: "lektionsplanen",
        storageBucket: "lektionsplanen.appspot.com",
        messagingSenderId: "899183966827",
        appId: "1:899183966827:web:63847420228c17790e0f2e"
    };


    // Vi kontrollerer at der ikke allerede er en initialiseret instans af firebase
    // Så undgår vi fejlen Firebase App named '[DEFAULT]' already exists (app/duplicate-app).

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    function onAuthStateChange(callback) {
        return firebase.auth().onAuthStateChanged(user => {
            if (user) {
                callback({loggedIn: true, user: user});
            } else {
                callback({loggedIn: false});
            }
        });
    }

    //Heri aktiverer vi vores listener i form af onAuthStateChanged, så vi dynamisk observerer om brugeren er aktiv eller ej.
    useEffect(() => {
        const unsubscribe = onAuthStateChange(setUser);
        return () => {
            unsubscribe();
        };
    }, []);

//Her oprettes gæstekomponentsindhold, der udgøres af sign-up og login siderne
    const GuestPage = () => {
        return(
            <View style={styles.container}>
                <Text style={styles.paragraph}>
                    Opret eller Login med din firebase Email
                </Text>

                <Card style={{padding:20}}>
                    <SignUpForm />
                </Card>

                <Card style={{padding:20}}>
                    <LoginForm />
                </Card>

            </View>
        )
    }
    const StackNavigation = () => {
        return(
            <Stack.Navigator>
                <Stack.Screen name={'LektionsPlan'} component={LektionsPlan}/>
                <Stack.Screen name={'Detaljer'} component={Detaljer}/>
                <Stack.Screen name={'Ændre'} component={Ændre}/>
            </Stack.Navigator>
        )
    }

    return user.loggedIn ? <NavigationContainer>
        <Tab.Navigator>
            <Tab.Screen name={'Lektionsplan'} component={StackNavigation} options={{tabBarIcon: () => ( <Ionicons name="home" size={20} />),headerShown:null}}/>
            <Tab.Screen name={'Tilføj'} component={Ændre} options={{tabBarIcon: () => ( <Ionicons name="add" size={20} />)}}/>
            <Tab.Screen name={'Profil'} component={Profil} options={{tabBarIcon: () => ( <AntDesign name="user" size={20} />)}}/>

        </Tab.Navigator>
    </NavigationContainer> : <GuestPage/> ;


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: '5%',
        backgroundColor: 'transparent',
        padding: 20,
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});


