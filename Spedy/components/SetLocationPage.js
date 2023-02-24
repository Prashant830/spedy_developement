import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";

import { useNavigation } from '@react-navigation/native';


import React from 'react';
import { Dimensions, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useDispatch } from "react-redux";
import { GooglePlaces } from "../Apikeys";
import style from "./CSS";
import Header from "./Header";
import IosStatusBar from './IosStatusBar';

// 

const SetLocationPage = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    dispatch({
        type: 'ADD_LOCATION',
        payload: {
            latitude: 26.7407914,
            longitude: 81.0720033
        }
    })



    return (
        <>

            <IosStatusBar />
            <View style={{ width: "100%", backgroundColor: "#f5220f", paddingBottom: 5, paddingLeft: 10 }}>
                <TouchableOpacity style={{ width: 25 }} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={30} color="#fff" />
                </TouchableOpacity>

            </View>
            <View>
                <View style={{ marginTop: 10, paddingHorizontal: 5 }}>
                    <Text style={{
                        marginTop: 15,
                        marginHorizontal: 5,
                        fontSize: 24,
                        fontWeight: "500",
                        marginBottom: 15
                    }}
                    >Select Your
                        <Text style={{
                            color: "#f5220f",
                            fontWeight: "700"
                        }}
                        > Location</Text></Text>
                </View>

                <View style={{
                    display: "flex",
                    alignItems: 'center',
                    justifyContent: "center",
                    width: Dimensions.get("window").width,
                    marginTop: 10

                }}>
                    <View style={{
                        display: "flex",
                        backgroundColor: '#fff',
                        flexDirection: "row",
                        alignItems: 'center',
                        width: "90%",
                        justifyContent: "center",
                        borderWidth: 2,
                        borderColor: "#f5220f",
                        borderRadius: 10,
                        paddingHorizontal: 10,
                        paddingVertical: 2
                    }}>
                        <GooglePlacesAutocomplete
                            placeholder='Search Your Location'
                            styles={{
                                textInput: style.input,
                                description: style.description
                            }}
                            onFail={(err) => console.log(err)}
                            onPress={(data, details) => {
                                // 'details' is provided when fetchDetails = true
                                console.log(data, details);
                            }}
                            query={{
                                key: "AIzaSyAMeULjSRAmXV6qdtwJhCHRqlrIm_7Yxjo",
                                language: 'en',
                            }}
                        />
                        <FontAwesome name="search" size={23} color="#f5220f" style={{ height: 35, paddingTop: 3 }} />
                    </View>

                </View>
                <View style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 10,
                    width: "100%",


                }}>
                    <TouchableOpacity style={{
                        width: "90%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center"

                    }}>
                        <Text style={{ fontSize: 16, fontWeight: "500", color: "#f5220f", paddingHorizontal: 5 }}>use current location</Text>
                        <MaterialIcons name="my-location" size={24} color="#f5220f" />
                    </TouchableOpacity>
                </View>

                <View style={{
                    width: "100%",
                    height: "50%",
                    backgroundColor: "gray",
                    marginTop: 25

                }}

                >

                </View>

                <View style={{
                    width: "100%",
                    display: "flex",
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 30

                }}>
                    <TouchableOpacity style={{
                        display: "flex",
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: "50%",
                        height: 50,
                        backgroundColor: "#f5220f",
                        borderRadius: 10
                    }}>
                        <Text style={{ color: "#fff", fontSize: 18, fontWeight: "500" }}>Confirm Location</Text>
                    </TouchableOpacity>
                </View>
            </View>


        </>
    )
}

export default SetLocationPage