//s136700
import * as React from 'react';
import { View, Text, Platform, FlatList, StyleSheet, Button, Alert } from 'react-native';
import firebase from 'firebase';
import {useEffect, useState} from "react";

const Detaljer = ({route,navigation}) => {
    const [koeretime,setKoeretime] = useState({});

    useEffect(() => {
        /*Henter køretime values*/
        setKoeretime(route.params.koeretime[1]);

        /* tøm object, når screen forlades*/
        return () => {
            setKoeretime({})
        }
    });

    const handleEdit = () => {
        // der navigeres videre til vores Ændre skærmen og sender dermed køretimen videre
        const koeretime = route.params.koeretime
        navigation.navigate('Ændre', { koeretime });
    };

    // bekræftelsesfunktion
    const confirmDelete = () => {
        //Platform OS specifikition
        if(Platform.OS ==='ios' || Platform.OS ==='android'){
            Alert.alert('Er du sikker?', 'Ønsker du at slette denne køretime?', [
                { text: 'Annuller', style: 'cancel' },

                { text: 'Slet', style: 'destructive', onPress: () => handleDelete() },
            ]);
        }
    };

    // køretimen slettes
    const  handleDelete = () => {
        const id = route.params.koeretime[0];
        try {
            firebase
                .database()
                // her sættes ID'et af køretimen ind i stien
                .ref(`/Koeretime/${id}`)
                // data fjernes herefter fra den sti
                .remove();

            navigation.goBack();
        } catch (error) {
            Alert.alert(error.message);
        }
    };


    if (!koeretime) {
        return <Text>No data</Text>;
    }


    return (
        <View style={styles.container}>
            <Button title="Ændre" onPress={ () => handleEdit()} />
            <Button title="Slet" onPress={() => confirmDelete()} />
            {
                Object.entries(koeretime).map((item,index)=>{
                    return(
                        <View style={styles.row} key={index}>
                            {/* køretime keys navn*/}
                            <Text style={styles.label}>{item[0]} </Text>
                            {/*køretime values navne */}
                            <Text style={styles.value}>{item[1]}</Text>
                        </View>
                    )
                })
            }
        </View>
    );
}

export default Detaljer;

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'flex-start' },
    row: {
        margin: 5,
        padding: 5,
        flexDirection: 'row',
    },
    label: { width: 100, fontWeight: 'bold' },
    value: { flex: 1 },
});