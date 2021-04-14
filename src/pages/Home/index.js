import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SvgUri } from "react-native-svg";

function Home({ navigation }) {
  return (
    <>
      <View style={styles.header}>
        <Text>WaysLink</Text>

        <View style={styles.wrapperButton}>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.buttonLogin}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.buttonRegister}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.body}>
        <Image
          source={require("../../assets/images/phone1.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
    </>
  );
}

export default Home;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#FFFF",
    paddingTop: 24,
    paddingBottom: 24,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  body: {
    flex: 1,
    backgroundColor: "#FF9F00",
    paddingHorizontal: 50,
  },
  wrapperButton: {
    width: "40%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonLogin: {
    color: "black",
  },
  buttonRegister: {
    backgroundColor: "#FF9F00",
    color: "#FFFF",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
  },

  image: {
    width: "auto",
  },
});
