import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";

function Login({ navigation }) {

  // const [form, setForm] = useState({
  //   email: "",
  //   password: ""
  // })

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Login</Text>
        </View>
        <View style={styles.body}>
          <TextInput placeholder="Email" style={styles.form} />
          <TextInput placeholder="Password" style={styles.form} />
          <TouchableOpacity onPress={() => navigation.navigate("MainApp")}>
            <Text style={styles.button}>Login</Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text style={styles.link}>Don't have an account ? Klik </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles.textLink}>Here</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFF",
    paddingTop: 124,
    paddingHorizontal: 20,
  },
  header: {
    paddingBottom: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
  },

  body: {
    flex: 1,
  },
  form: {
    width: "100%",
    backgroundColor: "#E5E5E5",
    color: "black",
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 20,
    marginVertical: 10,
    height: 50,
    borderRadius: 5,
    borderColor: "black",
  },
  button: {
    fontSize: 18,
    marginVertical: 10,
    width: "100%",
    backgroundColor: "#FF9F00",
    paddingHorizontal: 10,
    paddingVertical: 13,
    color: "#FFFF",
    fontWeight: "bold",
    textAlign: "center",
    borderRadius: 5,
  },
  link: {
    fontSize: 18,
  },
  textLink: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
