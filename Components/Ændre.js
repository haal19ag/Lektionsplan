//s136700
import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Button,
    Alert,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import firebase from 'firebase';
import {useEffect, useState} from "react";

const Ændre = ({navigation,route}) => {

    const initialState = {

        Kørelære: '',
        Dato: '',
        Tid: ''
    }

    const [newKoeretime,setNewKoeretime] = useState(initialState);

    //Returnere true
    const isEditKøreTime = route.name === "Ændre";

    useEffect(() => {
        if(isEditKøreTime){
            const koeretime = route.params.koeretime[1];
            setNewKoeretime(koeretime)
        }
        // data fjernes når vi går væk fra  screenen
        return () => {
            setNewKoeretime(initialState)
        };
    }, []);

    const changeTextInput = (name,event) => {
        setNewKoeretime({...newKoeretime, [name]: event});
    }

    const handleSave = () => {

        const { køretime, kørelære, dato, tid } = newKoeretime;

        if( kørelære.length === 0 || dato.length === 0 || tid.length === 0 ){
            return Alert.alert('Udfyld alle felter!');
        }

        if(isEditKøreTime){
            const id = route.params.koeretime[0];
            try {
                firebase
                    .database()
                    .ref(`/Koeretimer/${id}`)
                    // Vi bruger update, så kun de felter vi angiver, bliver ændret
                    .update({  kørelære, dato, tid });
                // Når bilen er ændret, går vi tilbage.
                Alert.alert("Din info er nu opdateret");
                const koeretime = [id,newKoeretime]
                navigation.navigate("Detaljer",{koeretime});
            } catch (error) {
                console.log(`Error: ${error.message}`);
            }

        }else{

            try {
                firebase
                    .database()
                    .ref('/Koeretimer/')
                    .push({  kørelære, dato, tid });
                Alert.alert(`Saved`);
                setNewKoeretime(initialState)
            } catch (error) {
                console.log(`Error: ${error.message}`);
            }
        }

    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {
                    Object.keys(initialState).map((key,index) =>{
                        return(
                            <View style={styles.row} key={index}>
                                <Text style={styles.label}>{key}</Text>
                                <TextInput
                                    value={newKoeretime[key]}
                                    onChangeText={(event) => changeTextInput(key,event)}
                                    style={styles.input}
                                />
                            </View>
                        )
                    })
                }
                {/* vis save changes når vi er inde på ændre */}
                <Button title={ isEditKøreTime ? "Save changes" : "Tilføj Køretime"} onPress={() => handleSave()} />
            </ScrollView>
        </SafeAreaView>
    );
}

export default Ændre;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor:'#262626'
    },
    row: {
        flexDirection: 'row',
        height: 30,
        margin: 10,
    },
    label: {
        fontWeight: 'bold',
        width: 100,
        color:'white'
    },
    input: {
        borderWidth: 1,
        padding:5,
        flex: 1,
        borderColor:'white',
        backgroundColor:'white',
        borderRadius:25
    },
});
