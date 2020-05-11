import React, { Component } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  ScrollView,
  Text,
  Button,
  Alert,
  ActivityIndicator,
  Image,
  FlatList,
} from "react-native";

export default class Status extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            data:[],
            isLoading: true,
            elevator: this.props.route.params.item,
        };
    }


    active = async () => {
        const id = this.state.elevator.id;
        fetch(`https://week12-restapi.herokuapp.com/api/elevator/${id}/update_status` , {
            method: 'PUT',
            headers:{
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                "status" : "active"
            })
        }).then(() => {
            fetch(`https://week12-restapi.herokuapp.com/api/elevator/${id}`)
            .then((response) => response.json())
            .then((responseJson) => {
                this.state({
                    isLoading: false,
                    dataSource: responseJson,
                })
                this.state.elevator.item.status = "active";
                this.eleStatus();
            })
        })
    }

    // inactive = async () => {
    //     const id = this.state.elevator.item.id;
    //     fetch(`https://week12-restapi.herokuapp.com/api/elevator/${id}/update_status` , {
    //         method: 'PUT',
    //         headers:{
    //             'Accept' : 'application/json',
    //             'Content-Type' : 'application/json'
    //         },
    //         body: JSON.stringify({
    //             "status" : "inactive"
    //         })
    //     }).then(() => {
    //         fetch(`https://week12-restapi.herokuapp.com/api/elevator/${id}`)
    //         .then((response) => response.json())
    //         .then((responseJson) => {
    //             this.state({
    //                 isLoading: false,
    //                 dataSource: responseJson,
    //             })
    //             this.state.elevator.item.status = "inactive";
    //             this.eleStatus();
    //         })
    //     })
    // }

    eleStatus = () => {
        console.log(this.state.elevator.item.status);
        if(this.state.elevator.item.status === "Inactive" || "inactive") {
            return(
                <TouchableOpacity
                    style={styles.buttonContainerInactive}
                    onPress={this.active}
                >
                <Text style={styles.buttonText}>
                  STATUS: {this.state.elevator.item.status}
                </Text>
              </TouchableOpacity>
            );
        } else {
            return(
                <TouchableOpacity
                    style={styles.buttonContainerActive}
                    onPress={this.inactive}
                >
                <Text style={styles.buttonText}>
                  STATUS: {this.state.elevator.item.status}
                </Text>
              </TouchableOpacity>
            );
        }
    };

    render() {
        return (
          <View style={styles.container}>
            <View style={{ alignItems: "center" }}>
              <Image
                style={{
                  width: 250,
                  height: 80,
                  marginBottom: 20,
                }}
                source={require("./assets/R2.png")}
              />
            </View>
            <View style={styles.item}>
              <Text style={styles.textList}>
                Elevator ID : {this.state.elevator.item.id}
              </Text>
              <Text style={styles.textList}>
                Serial Number : {this.state.elevator.item.serial_number}
              </Text>
              <Text style={styles.textList}>
                Serial Number : {this.state.elevator.item.model}
              </Text>
            </View>
            <View>
              {this.eleStatus()}
    
              <TouchableOpacity style={styles.buttonContainer}>
                <Text
                  style={styles.buttonText}
                  onPress={() => this.props.navigation.replace("EleList")}
                >
                  BACK
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonContainer}>
                <Text
                  style={styles.buttonText}
                  onPress={() => this.props.navigation.replace("Login")}
                >
                  LOGOUT
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      }
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        textAlign: "center",
        backgroundColor: "#bdc3c7",
        fontWeight: "bold",
        padding: 20,
        paddingTop: 50,
      },
      item: {
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
      },
      buttonContainer: {
        backgroundColor: "#0b63a0",
        paddingVertical: 15,
        marginBottom: 10,
      },
      buttonText: {
        textAlign: "center",
        color: "#FFF",
        fontWeight: "700",
      },
      textList: {
        fontSize: 16,
      },
      buttonPending: {
        textAlign: "center",
        color: "#FFF",
        fontWeight: "700",
      },
      buttonContainerInactive: {
        backgroundColor: "red",
        paddingVertical: 15,
        marginBottom: 10,
      },
      buttonContainerActive: {
        backgroundColor: "green",
        paddingVertical: 15,
        marginBottom: 10,
      },
    });