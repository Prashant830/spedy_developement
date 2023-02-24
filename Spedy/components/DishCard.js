import { Entypo } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from 'react-native';

const DishCard = ({ category, description, id, name, tags, img, isVeg, quantity, rating }) => {

    const Price = quantity[0]?.SPrice

    const [isLoading, setIsLoading] = useState(true)

    return (
        <View style={{
            borderWidth: 1,
            borderColor: "#f5220f",
            borderRadius: 10,
            width: "90%",
            overflow: "hidden",
            flexDirection: 'row',




        }}>
            <View style={
                isLoading ?
                    {
                        display: "flex",
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 120,
                        width: "100%",
                    }
                    :
                    {
                        display: 'none'
                    }
            }>
                <ActivityIndicator color="#f5220f" />
            </View>

            <View style={
                isLoading ?
                    {
                        height: 0,
                        width: 0
                    }
                    :
                    {
                        display: "flex",
                        alignItems: "center",

                    }}>
                <Image
                    source={{ uri: img }}
                    onLoadEnd={() => setIsLoading(false)}
                    style={{
                        width: 120,
                        height: 120,
                        resizeMode: "cover",

                    }} />
                <TouchableOpacity activeOpacity={0.8} style={{ backgroundColor: "#f5220f", width: 100, position: "absolute", bottom: 5, height: 30, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ fontSize: 16, fontWeight: "300", color: "#fff" }}>ADD</Text>
                </TouchableOpacity>
            </View>
            <View
                style={
                    isLoading ?
                        {
                            display: "none"
                        }
                        :
                        {
                            display: "flex",
                            flexDirection: "column",
                            paddingLeft: 10
                        }}>
                <Text style={{ fontSize: 16, fontWeight: "500", marginTop: 5 }}>{name}</Text>
                <Text style={{ marginTop: 5, width: "100%" }}>
                    {Array(rating).fill().map((_, i) => (
                        <Entypo name='star' size={16} color="gold" key={i} />
                    ))}

                </Text>
                <Text style={{ marginTop: 5 }}>₹{Price}</Text>
                <Text style={{ marginTop: 5, fontSize: 12 }}>{description}</Text>
            </View>
        </View>
    )
}

export default DishCard