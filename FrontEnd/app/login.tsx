import{ Text, View, StyleSheet, TextInput, Button, TouchableOpacity} from 'react-native';
import React, { useState } from 'react';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { styles } from '@/styles/styles';


export default function LoginScreen() {
    const [text, onChangeText] = useState('');
    const [password, onChangePass] = useState('');

    return (
        <>
        <SafeAreaProvider style={styles.container}>
            <SafeAreaView style={styles.container}>
                <TextInput 
                    style={styles.input} 
                    onChangeText = {onChangeText}
                    value={text}
                    placeholder="Username"/>
                
                <TextInput
                    style={styles.input}
                    onChangeText={onChangePass}
                    value={password}
                    placeholder="Enter your Password"
                />
               
               <TouchableOpacity style={styles.button}><Button title="LOGIN" /></TouchableOpacity>
            </SafeAreaView>
        </SafeAreaProvider>        
        </>
    )
};

