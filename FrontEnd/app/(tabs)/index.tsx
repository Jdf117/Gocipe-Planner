import { Text, View, StyleSheet, TouchableOpacity, TextInput, ScrollView, Button } from "react-native";
import { Link} from 'expo-router'
import React, { useState } from 'react';
import { styles } from '@/styles/styles';
export default function Index() {
const [search, setSearch] = useState('');

  return (
    <>
    <View style={styles.container}>
  
        <Text>Welcome to Grocip! Recipes on the go!</Text>
        <Text>Login below or start searching for recipes!</Text>
        <Link href = "/login" style={styles.button}>Login</Link>
        <TextInput
            
            style={styles.input} 
            onChangeText = {setSearch}
            value={search}
            placeholder="Find Recipes"
        />
        
        <TouchableOpacity style={styles.button}><Button title="SEARCH" /></TouchableOpacity>
    </View>
    </>
  );
}

