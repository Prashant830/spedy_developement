

import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import * as Location from 'expo-location';
import haversine from "haversine";

import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Dimensions,
    Image,
    Platform,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput, TouchableOpacity, View
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import firebaseApp from "../config";
import CategoryCard from "./CategoryCard";
import { category, images, shop } from "./Db";
import Header from "./Header";
import IosStatusBar from "./IosStatusBar";
import NotAvailable from './NotAvailable';
import ResCard from "./ResCard";
import TabNavigation from "./TabNavigation";

const HomePage = ({ getPermission, userLocation, userAdd }) => {

    const dispatch = useDispatch()
    const Height = Dimensions.get('screen').height
    const [restaurants, setRestaurants] = useState()
    var restaurantsInRange = []
    const userCoordinates = useSelector((state) => state.userLocationReducer.location)
    const userAddress = useSelector((state) => state.userLocationReducer.address)
    const navigation = useNavigation()
    const FetchRestaurants = firebaseApp.firestore().collection("Restaurants")

    useEffect(() => {

        if (userAdd != undefined) {
            dispatch({
                type: 'ADD_ADDRESS',
                payload: userAdd,
            })
            dispatch({
                type: 'ADD_LOCATION',
                payload: userLocation,
            })
            dispatch({
                type: 'ADD_PERMISSION',
                payload: getPermission
            })
        }

    }, [userAdd])




    useEffect(() => {

        (() => {
            FetchRestaurants.onSnapshot(res => {
                setRestaurants(
                    res.docs.map((restaurant) => (
                        restaurant.data()
                    ))
                )
            })

        }
        )
            ()


    }, [userAddress])


    restaurants?.forEach((restaurant) => {

        const startPoint = {
            latitude: userCoordinates?.latitude,
            longitude: userCoordinates?.longitude
        }

        const endPoint = {
            latitude: restaurant?.Coordinates.Latitude,
            longitude: restaurant?.Coordinates.Longitude
        }

        const distance = haversine(startPoint, endPoint, { unit: "km" })


        if (Math.floor(distance) <= 10) {

            restaurantsInRange.push(restaurant)

        }
    })




    return (
        restaurants?.length === undefined ?
            <>
                <IosStatusBar />
                <Header delivery={false} />
                <View
                    style={{
                        width: "100%",
                        height: "70%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <View style={{ backgroundColor: "#f5220f", padding: 10, borderRadius: 50 }}>
                        <ActivityIndicator size={30} color="#fff" />
                    </View>
                </View>
            </>

            :
            // (restaurantsInRange?.length === 0 && userAddress?.country) ?
            //     <NotAvailable />

            //     :
            <>
                <IosStatusBar />
                <Header />
                {/* <SafeAreaView style={{ backgroundColor: '#fff', marginBottom: 50 }} className="h-max"> */}
                <ScrollView showsVerticalScrollIndicator={false} className="h-max" style={{
                    backgroundColor: "#fff",
                    marginBottom: -Height + Height + 60,
                    zIndex: 0,


                }}>

                    <View className="flex flex-col w-full">
                        <Text style={{
                            marginTop: 15,
                            marginHorizontal: 5,
                            fontSize: 24,
                            fontWeight: "500",
                            marginBottom: 15

                        }}>
                            Spedy <Text style={{
                                color: "#f5220f",
                                fontWeight: "700"

                            }}>Categories</Text>
                        </Text>
                        <View
                            className="flex mt-0 mb-3  "
                            style={{

                                overflow: "scroll",
                            }}

                        >
                            <ScrollView
                                horizontal={true}
                                indicatorStyle="black"
                                showsHorizontalScrollIndicator={false}
                                style={{
                                    shadowOffset: { width: 10, height: 10 },
                                    shadowColor: "black",
                                    shadowOpacity: 0.2,
                                    shadowRadius: 3,
                                    backgroundColor: "#fff"
                                }}
                            >
                                {category.map(({ name }) => (
                                    <CategoryCard name={name} key={name} />
                                ))}
                            </ScrollView>
                        </View>
                    </View>
                    <View
                        className="shadow-md mb-5 mt-5 flex items-center w-max"
                        style={{ overflow: "hidden", background: '#ffff' }}
                    >
                        <ScrollView

                            horizontal={true}

                            showsHorizontalScrollIndicator={false}
                            pagingEnabled={true}
                            bounces={false}
                            style={{
                                width: Dimensions.get("window").width,
                                overflow: "hidden",
                                backgroundColor: '#ffff'
                            }}
                        >
                            {images.map((item, index) => (
                                <Image
                                    source={item}
                                    className="  ml-0 mr-0"
                                    style={{ height: 200, backgroundColor: "#ffff", width: Dimensions.get("window").width }}
                                    key={index}


                                ></Image>
                            ))}
                        </ScrollView>
                    </View>

                    <Text

                        style={{
                            marginTop: 15,
                            marginHorizontal: 5,
                            fontSize: 24,
                            fontWeight: "500",
                            marginBottom: 15
                        }}
                    >
                        {restaurantsInRange?.length > 0 ? 'Nearest' : 'Spedy'} <Text style={{
                            color: "#f5220f",
                            fontWeight: "700"
                        }}>Restaurants</Text>
                    </Text>

                    <View style={
                        (restaurantsInRange[0]?.Address || restaurants[0]?.Address) ?
                            {
                                display: "none"
                            }
                            :
                            {
                                width: "100%",
                                height: "10%",
                                paddingBottom: Platform.OS === 'android' ? 30 : 50,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: 'center'
                            }
                    }>
                        <ActivityIndicator color="#f5220f" />
                    </View>

                    <View
                        style={
                            (restaurantsInRange[0]?.Address || restaurants[0]?.Address) ?
                                {
                                    marginBottom: 0,
                                    marginTop: 0,
                                    paddingBottom: Platform.OS === 'android' ? 30 : 50,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }
                                :
                                {
                                    display: "none"
                                }

                        }
                        className="shadow-md h-max"
                    >
                        {(userAddress?.country === undefined) && restaurants.map((restaurant, index) => (
                            (index <= 4) &&
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
                                />
                            </TouchableOpacity>


                        ))}


                        {restaurantsInRange.map((restaurant, index) => (
                            (index <= 4) &&
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
                                />
                            </TouchableOpacity>


                        ))}

                    </View>



                </ScrollView>


                <TabNavigation isHomePage={true} />
            </>


    );
};

export default HomePage;
