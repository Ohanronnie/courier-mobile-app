import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/ButtonUI";
import Input from "../components/Input";
import { TextInput } from "react-native";

const defaultImage = require("@/assets/images/favicon.png");
const cartonImage = require("@/assets/images/carton.png");
const invoiceImage = require("@/assets/images/invoice.png");
export const HorizontalLine = () => {
  return (
    <View
      style={{
        height: 1,
        backgroundColor: "#e0e0e0", // Light gray color
        marginVertical: 10, // Add spacing above and below the line
      }}
    />
  );
};
function ShipmentCard() {
  return (
    <View className="w-full mb-2 flex flex-row justify-between items-center">
      <Image
        source={cartonImage}
        className="rounded-"
        style={{ width: 80, height: 80, borderRadius: 10 }}
      />
      <View className="flex flex-col">
        <Text className="font-medium text-lg">Ayodeji Olalekan</Text>
        <Text className="text-md font-normal text-slate-700 mt-2">
          123456 Agege Road Lagos, NG
        </Text>
        <View className="flex flex-wrap">
          <Text className="bg-green-500 px-2 py-2 mt-2 rounded-md text-white text-center">
            Delivered
          </Text>
        </View>
      </View>
      <Pressable className="bg-primary rounded-2xl h-14 w-12 mr-2 flex items-center justify-center">
        <Ionicons name="chevron-forward" size={24} color={"white"} />
      </Pressable>
    </View>
  );
}
export default function Home() {
  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="mx-4 mt-4 h-full">
          <View className="flex flex-row rounded-full items-center justify-between">
            <View className=" rounded-full h-12 w-12 flex items-center justify-center">
              <Image
                source={defaultImage}
                style={{ height: 30, width: 30, borderRadius: 100 }}
                className=" rounded-full w-24 h-24 mx-auto"
              />
            </View>
            <View className="flex justify-center items-center flex-col">
              <Text className="text-sm">Location</Text>
              <Text className="font-medium text-lg">
                <Ionicons name="location" size={24} color={"#ff7850"} /> Lagos,
                Nigeria
              </Text>
            </View>
            <View className="">
              <Text className="opacity-0">Hello</Text>
            </View>
          </View>
          <View className="bg-primary mt-12 rounded-3xl">
            <View className="flex h-52  pt-8 px-6 flex-col">
              <Text className="text-3xl font-medium text-white">
                Track your package
              </Text>
              <Text className="text-white my-2 text-lg">
                Enter your tracking number
              </Text>
              <View className="flex rounded-full mt-4 flex-row items-center bg-white">
                <TextInput
                  className="w-[80%] h-16 bg-white rounded-3xl pl-6 text-lg"
                  placeholder="Track your package here"
                />
                <Pressable className="w-[15%] rounded-full h-12 flex items-center justify-center px-2 bg-primary">
                  <Ionicons
                    name="search"
                    color={"white"}
                    className="text-white"
                    size={24}
                  />
                </Pressable>
              </View>
            </View>
          </View>
          <View className="mt-8">
            <Text className="text-2xl font-medium">
              What are you looking today?
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mt-6"
            >
              <View className=" ml-2">
                <View className="bg-white rounded-2xl w-40 h-32 mr-4 flex items-center justify-center">
                  <Image
                    source={cartonImage}
                    style={{ width: 60, height: 60 }}
                    className="w-24 h-24 rounded-full"
                  />
                </View>
                <Text className="text-lg font-medium mt-2">Send Package</Text>
              </View>
              <View className=" ml-2">
                <View className="bg-white rounded-2xl w-40 h-32 mr-4 flex items-center justify-center">
                  <Image
                    source={invoiceImage}
                    style={{ width: 100, height: 100 }}
                    className="w-24 h-24 rounded-full"
                  />
                </View>
                <Text className="text-lg font-medium mt-2">Price Check</Text>
              </View>
            </ScrollView>
          </View>
          <View className="mt-10">
            <View className="flex flex-row justify-between">
              <Text className="text-2xl font-medium">Courier Shipment</Text>
              <Text className="text-xl text-primary font-medium">See All</Text>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerClassName="w-full mt-6 ml-2"
            >
              <ShipmentCard />
              <HorizontalLine />

              <ShipmentCard />
              <HorizontalLine />
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
