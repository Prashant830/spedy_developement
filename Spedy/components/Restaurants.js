import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import haversine from "haversine";
import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSelector } from "react-redux";
import firebaseApp from "../config";
import { shop } from "./Db";
import IosStatusBar from './IosStatusBar';
import ResCard from "./ResCard";
import TabNavigation from './TabNavigation';
const Restaurants = () => {
    const navigation = useNavigation()
    const [restaurants, setRestaurants] = useState()
    var restaurantsInRange = []
    const Height = Dimensions.get('screen').height
    const FetchRestaurants = firebaseApp.firestore().collection("Restaurants")
    const userLocation = useSelector((state) => state.userLocationReducer.location)
    const userAddress = useSelector((state) => state.userLocationReducer.address)


    useEffect(() => {
        (async () => {
            FetchRestaurants.onSnapshot(res => {
                setRestaurants(
                    res.docs.map((restaurant) => (
                        restaurant.data()
                    ))
                )
            })
            // console.log(restaurants)

        })
            ()
    }, [])

    restaurants?.forEach((restaurant) => {
        const startPoint = {
            latitude: userLocation?.latitude,
            longitude: userLocation?.longitude
        }

        const endPoint = {
            latitude: restaurant?.Coordinates.Latitude,
            longitude: restaurant?.Coordinates.Longitude
        }

        const distance = haversine(startPoint, endPoint, { unit: "km" })

        if (Math.floor(distance) <= 10) {
            // console.log(Math.floor(distance))
            restaurantsInRange?.push(restaurant)
        }

    }
    )

    // console.log(restaurantsInRange[0].OwnerNumber)

    return (
        <>
            <IosStatusBar />
            <View style={{ width: "100%", backgroundColor: "#f5220f", paddingBottom: 5, paddingLeft: 10 }}>
                <TouchableOpacity style={{ width: 25 }} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={30} color="#fff" />
                </TouchableOpacity>

            </View>
            <ScrollView style={{
                backgroundColor: "#fff",
                marginBottom: -Height + Height + 50,
                height: "100%"
            }}
                showsVerticalScrollIndicator={false}
            >
                <View style={{
                    display: "flex",
                    alignItems: 'center',
                    width: "100%",
                    justifyContent: "center",
                    marginVertical: 30
                }}>
                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: 'center',
                        justifyContent: "center",
                        borderWidth: 2,
                        borderColor: "#f5220f",
                        borderRadius: 10,
                        paddingVertical: 5,
                        paddingHorizontal: 20,
                        backgroundColor: "#fff",
                        elevation: 10,
                        shadowOffset: { width: 0, height: 10 },
                        shadowColor: 'grey',
                        shadowOpacity: .3,
                        shadowRadius: 5,

                    }}>
                        <TextInput style={{ width: "80%", height: 40, fontSize: 14, fontWeight: "500" }} placeholder="Search for restaurant, item or more" />
                        <FontAwesome name="search" size={23} color="#f5220f" style={{ height: 35, paddingTop: 3 }} />
                    </View>
                </View>


                <View style={{ marginTop: 10, paddingHorizontal: 5 }}>
                    <Text style={{
                        marginTop: 0,
                        marginHorizontal: 5,
                        fontSize: 24,
                        fontWeight: "500",
                        marginBottom: 0
                    }}
                    >{(restaurantsInRange?.length > 0) ? restaurantsInRange?.length : restaurants?.length} Restaurants on
                        <Text style={{
                            color: "#f5220f",
                            fontWeight: "700"
                        }}
                        > Spedy</Text></Text>
                </View>

                <View style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 50


                }}>
                    {(userAddress?.country === undefined) && restaurants?.map((restaurant, index) => (

                        <TouchableOpacity activeOpacity={1} key={restaurant?.Id} onPress={() => navigation.navigate('RestaurantDetail', {
                            name: restaurant?.Name,
                            address: restaurant?.Address,
                            id: restaurant?.Id,
                            isopen: restaurant?.Isopen,
                            coordinates: restaurant?.Coordinates,
                            dishes: restaurant?.Dishes,
                            img: restaurant?.RestaurantImage,
                            rating: restaurant?.Rating,
                            location: restaurant?.Coordinates,
                            ownerNumber: restaurant?.OwnerNumber,
                        })} style={{
                            elevation: 10,
                            shadowOffset: { width: 0, height: 5 },
                            shadowColor: 'grey',
                            shadowOpacity: .5,
                            shadowRadius: 5,
                            marginTop: 50,

                        }}>
                            <ResCard
                                img={restaurant?.RestaurantImage}
                                name={restaurant?.Name}
                                key={restaurant?.Id}
                                shopid={restaurant?.Id}
                                address={restaurant?.Address}
                                rating={restaurant?.Rating}
                                location={restaurant?.Coordinates}
                                ownerNumber={restaurant?.OwnerNumber}
                            />
                        </TouchableOpacity>


                    ))}

                    {restaurantsInRange?.map((restaurant) => (

                        <TouchableOpacity activeOpacity={1} key={restaurant?.Id} onPress={() => navigation.navigate('RestaurantDetail', {
                            name: restaurant?.Name,
                            address: restaurant?.Address,
                            id: restaurant?.Id,
                            isopen: restaurant?.Isopen,
                            coordinates: restaurant?.Coordinates,
                            dishes: restaurant?.Dishes,
                            img: restaurant?.RestaurantImage,
                            rating: restaurant?.Rating,
                            location: restaurant?.Coordinates,
                            ownerNumber: restaurant?.OwnerNumber,

                        })} style={{
                            elevation: 10,
                            shadowOffset: { width: 0, height: 5 },
                            shadowColor: 'grey',
                            shadowOpacity: .5,
                            shadowRadius: 5,
                            marginTop: 50,

                        }}>

                            <ResCard
                                img={restaurant?.RestaurantImage}
                                name={restaurant?.Name}
                                key={restaurant?.Id}
                                shopid={restaurant?.Id}
                                address={restaurant?.Address}
                                rating={restaurant?.Rating}
                                location={restaurant?.Coordinates}
                                ownerNumber={restaurant?.OwnerNumber}
                            />
                        </TouchableOpacity>
                    ))}
                </View>


            </ScrollView>
            <TabNavigation isRestaurants={true} />
        </>
    )
}

export default Restaurants