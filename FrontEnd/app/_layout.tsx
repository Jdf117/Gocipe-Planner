import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter, Link } from "expo-router";
import { Text, TouchableOpacity, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function RootLayout() {
  const router = useRouter();
  const navigation = useNavigation();

  return (
      <Stack screenOptions = {{ headerShadowVisible: false}}>
        <Stack.Screen 
          name = "(tabs)" options={{ title: ' Grocip', 
          headerLeft: () => <Ionicons name="nutrition-outline" size={24} color="black"/>, 
          headerRight: () => (<TouchableOpacity onPress={() => {console.log("button pressed"); router.push("/login")}}>
          <Text style={{ color: "blue", marginRight: 10 }}>ACCOUNT</Text>
        </TouchableOpacity>)
          }}
        />

        <Stack.Screen 
          name = "login" options={{ headerTitle: 'Back'}}
        />

      </Stack>
  );
}
 
//<Ionicons name='person-circle-outline' size={24} color="black" onPress={() => router.push("/(modals)/login")}/>
//<Link href={'/(tabs)/favourites'}><Button>LOGIN</Button></Link>