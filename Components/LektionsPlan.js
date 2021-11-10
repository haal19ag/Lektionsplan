//s137971
import * as React from 'react';
import {Text, FlatList, TouchableOpacity, StyleSheet, View, SafeAreaView} from 'react-native';
import firebase from 'firebase';
import {useEffect, useState} from "react";
import {Designer} from "../const";

const LektionsPlan = ({navigation}) => {

    const [koeretimer,setKoeretimer] = useState()

    useEffect(() => {
        if(!koeretimer) {
            firebase
                .database()
                .ref('/Koeretimer')
                .on('value', snapshot => {
                        setKoeretimer(snapshot.val())
                });
        }
    },[]);

    // ingen data er lik med ingen visning
    if (!koeretimer) {
        return <Text>Loading...</Text>;
    }

   const handleSelectKoeretime = id => {
        //i arrayet av kjøretimer søkes det direkte og man finner kjøretime objektet som matcher det ID som har blitt tilsendt
        const koeretime = Object.entries(koeretimer).find( koeretime => koeretime[0] === id /*id*/)

        navigation.navigate('Detaljer', { koeretime });
    };

    //  alle values fra våres kjøretime objekt tas og bruker som array til våres flatlist
    const koeretimeArray = Object.values(koeretimer);
    const koeretimeKeys = Object.keys(koeretimer);




    return (
        <View style={styles.container}>
        <Text
        style={{color:'white', fontSize:25, textAlign:'center'}}

        >Køretimer</Text>
        <FlatList
            style={{backgroundColor:'#262626'}}
            data={koeretimeArray}
            // til å finde ID bruker man  køretimeKeys på den spesifikke kjøretime og returnerer nettopp dette som key, hvorved dette gis med som ID til KøretimeListItem
            keyExtractor={(item, index) => koeretimeKeys[index]}
            renderItem={({ item, index }) => { console.log(item)
                return(
                    <TouchableOpacity style={styles.container} onPress={() => handleSelectKoeretime(koeretimeKeys[index])}>
                        <Text style={styles.text}>
                            Køretime {index+1}
                        </Text>
                    </TouchableOpacity>
                )
            }}
        />

            <Text
                style={{color:'white', fontSize:25, textAlign:'center'}}

            >Teoritimer</Text>
            <FlatList
                style={{backgroundColor:'#262626'}}
                data={Designer}

                // til å finne ID bruker man  køretimeKeys på den spesifikke kjøretime og returnerer nettopp dette som key, hvorved dette gives med som ID til KøretimeListItem
                keyExtractor={(item, index) => koeretimeKeys[index]}
                renderItem={({ item, index }) => { console.log(item)
                    return(
                        <TouchableOpacity style={styles.container} onPress={() => console.log("hej")}>
                            <Text style={styles.text}>
                                Teoritime {item}
                            </Text>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    );

    }





export default LektionsPlan;










const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 2,
        borderRadius:20,
        backgroundColor: '#262626',
        margin: 5,
        padding: 5,
        height: 50,
        justifyContent:'center',
        borderColor: '#2c6c74'
    },
    text:{
        color:'white'
    },
    label: { fontWeight: 'bold' },
});
