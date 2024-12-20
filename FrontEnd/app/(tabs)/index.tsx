import { Text, View, StyleSheet, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { Link} from 'expo-router'
import React, { useState } from 'react';


export default function Index() {
const [search, setSearch] = useState('');

  return (
    <>
    <View style={styles.container}>
  
        <Text>Welcome to Grocip! Recipes on the go!</Text>
        <Text>Login below or start searching for recipes!</Text>
        <Link href = "/login" style={styles.button}>Login</Link>
        <TextInput
            
        />
      
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: 'Black',
    padding: 10
  }
})
