import * as React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

export default function Tarjetitas({ onPress, isTurnedOver, children }) {
    return (
        <Pressable
        onPress={onPress} style={isTurnedOver ? styles.cardUp : styles.cardDown}>
            {isTurnedOver ? (
                <Text style={styles.text}>{children}</Text>
            ) : (
                <Text style={styles.text}>?</Text>
            )}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    cardUp: {
        width: 100,
        height: 100,
        margin: 10,
        borderWidth: 10,
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor: "#1e293b"
    },
    cardDown: {
        width: 100,
        height: 100,
        margin: 10,
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor: "#1e293b"
    },
    text: {
        fontSize: 46,
        color: "#334155"
    }
})