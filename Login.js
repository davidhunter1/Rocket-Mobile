import React, { useState } from 'react';
import {
    View,
    TextInput,
    TouchableOpacity, 
    Image,
    StyleSheet,
    Text,
    Alert
} from 'react-native';

export default function Login({navigation}) {
    const [email, setEmail] = useState('');

        checkEmail = async () => {
            const response = await fetch(`https://week12-restapi.herokuapp.com/api/employee/${email}`);
            if(response.status === 200 ) {
                navigation.navigate('EleList');
            } else {
                return Alert.alert('Email is not in the system');
            }
        };
        return (
            <View style={{padding: 100}}>
            <Image
              style={{ width: 250, height: 80, marginBottom: 20 }}
              source={require("./assets/R2.png")}
            />
    
            <TextInput
              onChangeText={email => setEmail(email)}
              placeholder="email"
              returnKeyType="go"
              autoCapitalize="none"
              keyboardType="email-address"
              style={styles.input}
            />
            <TouchableOpacity style={styles.buttonContainer} onPress={this.checkEmail.bind(this)}>
              <Text style={styles.buttonText} >
                LOGIN
              </Text>
            </TouchableOpacity>
          </View>
        );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 100
    },
    input: {
      height: 40,
      marginBottom: 10,
      backgroundColor: "rgba(11, 19, 160, 0.2)",
      color: "#636e72",
      paddingHorizontal: 10,
    },
    buttonContainer: {
      backgroundColor: "#0b63a0",
      paddingVertical: 15,
    },
    buttonText: {
      textAlign: "center",
      color: "#FFF",
      fontWeight: "700",
    },
  });