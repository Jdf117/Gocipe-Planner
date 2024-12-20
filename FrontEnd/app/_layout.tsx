import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
      <Stack screenOptions = {{ headerShadowVisible: false}}>
        <Stack.Screen 
          name = "(tabs)" options={{ title: ' Grocip', 
          headerLeft: () => <Ionicons name="nutrition-outline" size={24} color="black"/>, 
          headerRight: () => <Ionicons name='person-circle-outline' size={24} color="black"/> 
          }}
        />

        <Stack.Screen 
          name = "about" options={{ title: 'About'}}
        />
      </Stack>
  );
}
