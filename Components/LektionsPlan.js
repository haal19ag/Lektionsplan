
import * as React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import firebase from 'firebase';
import {useEffect, useState} from "react";


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

    // intet data er lig med ingen visning
    if (!koeretimer) {
        return <Text>Loading...</Text>;
    }

   const handleSelectKoeretime = id => {
        console.log(id)
        //i arrayet af køretimer søges der Hdirekte og man finder køretime objektet som matcher det ID der er blevet tilsendt
        const koeretime = Object.entries(koeretimer).find( koeretime => koeretime[0] === id /*id*/)
       console.log(koeretimer)

        navigation.navigate('Detaljer', { koeretime });
    };

    //  alle values fra vores køretime objekt tages og bruger som array til vores flatlist
    const koeretimeArray = Object.values(koeretimer);
    const koeretimeKeys = Object.keys(koeretimer);

    console.log(koeretimeArray[0])

    return (
        <FlatList
            style={{backgroundColor:'#404040'}}
            data={koeretimeArray}
            //asdasd
            // til at finde ID bruger man  køretimeKeys på den specifikke køretime og returnerer netop dette som key, hvorved dette gives med som ID til KøretimeListItem
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
    );
}

export default LektionsPlan;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        fontStyle: "bold",
        borderWidth: 0,
        borderRadius:20,
        backgroundColor: '#262626',
        textAlign: "center",
        margin: 5,
        padding: 5,
        height: 50,
        justifyContent:'center'
    },
    text:{
        color:'white'
    },
    label: { fontWeight: 'bold' },
});
