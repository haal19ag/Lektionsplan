//S137146
import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import firebase from 'firebase';

function Profil () {

    //handleLogout håndterer log ud af en aktiv bruger.
    //Metoden er en prædefineret metode, som firebase stiller tilrådighed
    //Metoden er et asynkrontkald.
    const handleLogOut = async () => {
        await firebase.auth().signOut();
    };

    //Hvis der af en eller anden grund ikke skulle være muligt at fremfinde den aktive bruger,
    //skal der udprintes en besked om dette igennem en tekstkomponent
    if (!firebase.auth().currentUser) {
        return <View><Text>Not found</Text></View>;
    }

    //I return() udnyttes en prædefineret metode, som firebase stiller til rådighed.
    // Metoden returnerer mailadressen af den aktive bruger.
    // Mailadressen udskrives ved brug af en tekstkomponent.
    return (
        <View style={styles.container} >
            <Text
                style={{color:'white',fontSize:'20', textAlign:'center'}}
            >Bruger: {firebase.auth().currentUser.email}</Text>
            <Button onPress={() => handleLogOut()} title="Log ud" />
        </View>
    );

}

//Lokal styling til brug i ProfileScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: '5%',
        backgroundColor: '#262626',
        padding: 8,
    },
});

//Eksport af Loginform, således denne kan importeres og benyttes i andre komponenter
export default Profil
