// import { useState } from "react";
// import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../firebase/FirebaseSetup";

// export default function Login({ navigation }) {
//   // const [username, setUsername] = useState(null);
//   const [email, setEmail] = useState(null);
//   const [password, setPassword] = useState(null);
//   const signupHandler = () => {
//     navigation.replace("SignUp");
//   };
//   const loginHandler = async () => {
//     if (!email || !password) {
//       Alert.alert("Please fill all the fields");
//       return;
//     }
//     try {
//       const userCred = await signInWithEmailAndPassword(auth, email, password);
//       console.log(userCred);
//       navigation.navigate("Profile");
//     } catch (err) {
//       console.log(err);
//       if (err.code === "auth/invalid-login-credentials") {
//         Alert.alert("invalid credentials");
//       }
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.label}>Email</Text>
//       <TextInput
//         placeholder="Email"
//         style={styles.input}
//         value={email}
//         onChangeText={(changedText) => {
//           setEmail(changedText);
//         }}
//       />
//       <Text style={styles.label}>Password</Text>
//       <TextInput
//         style={styles.input}
//         secureTextEntry={true}
//         placeholder="Password"
//         value={password}
//         onChangeText={(changedText) => {
//           setPassword(changedText);
//         }}
//       />
//       <Button title="Login" onPress={loginHandler} />
//       <Button title="New User? Create An Account" onPress={signupHandler} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "stretch",
//     justifyContent: "center",
//   },
//   input: {
//     borderColor: "#552055",
//     borderWidth: 2,
//     width: "90%",
//     margin: 5,
//     padding: 5,
//   },
//   label: {
//     marginLeft: 10,
//   },
// });
import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/FirebaseSetup";

export default function Login({ navigation }) {
  // const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const signupHandler = () => {
    navigation.replace("SignUp");
  };
  const loginHandler = async () => {
    if (!email || !password) {
      Alert.alert("Please fill all the fields");
      return;
    }

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCred);
      navigation.navigate("Profile");
    } catch (err) {
      console.log(err);
      if (err.code === "auth/invalid-login-credentials") {
        Alert.alert("invalid credentials");
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(changedText) => {
          setUsername(changedText);
        }}
      /> */}

      <Text style={styles.label}>Email</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={(changedText) => {
          setEmail(changedText);
        }}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="Password"
        value={password}
        onChangeText={(changedText) => {
          setPassword(changedText);
        }}
      />
      <Button title="Login" onPress={loginHandler} />
      <Button title="New User? Create An Account" onPress={signupHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center",
  },
  input: {
    borderColor: "#552055",
    borderWidth: 2,
    width: "90%",
    margin: 5,
    padding: 5,
  },
  label: {
    marginLeft: 10,
  },
});
