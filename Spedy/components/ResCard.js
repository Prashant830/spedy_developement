import { Entypo } from '@expo/vector-icons';
import haversine from "haversine";
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, SafeAreaView, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import style from './CSS';

const ResCard = ({ img, name, shopid, address, rating, location }) => {
    const userLocation = useSelector((state) => state.userLocationReducer.location)
    const userAddress = useSelector((state) => state.userLocationReducer.address)

    const [imgLoading, setImgLoading] = useState(true)
    const [disfromusertores, setDisfromusertores] = useState(null)

    useEffect(() => {
        (async () => {

            const startPoint = {
                latitude: userLocation?.latitude,
                longitude: userLocation?.longitude
            }

            const endPoint = {
                latitude: location.Latitude,
                longitude: location.Longitude
            }

            const distance = haversine(startPoint, endPoint, { unit: "meter" })


            setDisfromusertores((distance / 1000).toFixed(1))
        })
            ()

    }, [userLocation])



    return (

        <>


            <View style={style.boxContainer} className="flex flex-col h-min flex-wrap" >
                <View style={
                    imgLoading ?
                        {
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }
                        :
                        {
                            display: "none"
                        }
                }>
                    <ActivityIndicator color="#f5220f" />
                </View>
                <Image source={{ uri: img }} style={{
                    width: "100%",
                    height: "100%",
                    resizeMode: "cover",
                    opacity: 1
                }}
                    onLoadEnd={() => setImgLoading(false)}
                />
                <Text style={
                    imgLoading ?
                        {
                            display: "none"
                        }
                        :
                        {
                            position: "absolute",
                            bottom: 40,
                            width: "100%",
                            paddingHorizontal: 10,
                            fontSize: 26,
                            fontWeight: "500",
                            color: "white"
                        }}>{name}</Text>

                <Text style={
                    imgLoading ?
                        {
                            display: "none"
                        }
                        :
                        {
                            position: "absolute",
                            top: 5,
                            width: "100%",
                            paddingHorizontal: 10,
                            marginTop: 10,

                        }}>
                    {Array(rating)
                        .fill()
                        .map((_, i) => (
                            <Entypo name='star' size={24} color="gold" key={i} />
                        ))}

                </Text>
                <Text style={
                    imgLoading ?
                        {
                            display: "none"
                        }
                        :
                        {
                            position: "absolute",
                            bottom: 10,
                            width: "100%",
                            paddingHorizontal: 10,
                            fontSize: 14,
                            fontWeight: "300",
                            color: "white"
                        }}>{address}</Text>
                <Text style={
                    imgLoading ?
                        {
                            display: "none"
                        }
                        :
                        {
                            position: "absolute",
                            top: 7,
                            right: 0,
                            width: "50%",
                            paddingHorizontal: 5,
                            fontSize: 14,
                            fontWeight: "500",
                            color: "white",
                            textAlign: 'right'
                        }}>{!userAddress?.country ? "" : (disfromusertores > 5) ? `30 min ${disfromusertores} km` : `15 min ${disfromusertores} km`}</Text>


            </View>
        </>


    )
}

export default ResCard