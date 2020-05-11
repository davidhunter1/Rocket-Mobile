import React , { Component } from 'react'
import {
    TouchableOpacity,
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
    FlatList,
    ScrollView,
  } from "react-native";

export default class EleList extends Component {

    state = {
        data:[],
        isLoading: true,
    };

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        fetch("https://dry-chamber-06683.herokuapp.com/api/intervention")
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            data: responseJson,
            isLoading: false,
          });
        });
    };

    goToStatusScreen = (item) => {
        const { navigation } = this.props;
        navigation.navigate("Status", { item: { item } });
      };

        render() {
            let { data , isLoading } = this.state;
            if(isLoading) {
                return(
                    <View
                        style={styles.container}
                    >
                    <ActivityIndicator size="large" animating />
                  </View>
                )
            } else {
                return(
                    <View style={styles.container}>
                        <FlatList
                        data={this.state.data}
                        keyExtractor={(x, i) => i.toString()}
                        renderItem={({ item }) =>
                            <View>
                                <TouchableOpacity
                                    onPress={() => this.goToStatusScreen(item)}
                                >
                                    <Text style={styles.item}>
                                    {`Elevator ID: ${item.id} `}
                                    {`Status: ${item.status}`}
                                    </Text>
                                </TouchableOpacity>

                            </View>
                            }
                        />
                    </View>
                );
            }

        }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      textAlign: "center",
      backgroundColor: "#f0f0f0",
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
    },
    buttonText: {
      textAlign: "center",
      color: "#FFF",
      fontWeight: "700",
    },
    flatList: {
      height: "80%",
      flexGrow: 0,
    },
  });