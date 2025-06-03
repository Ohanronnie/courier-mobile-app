import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../components/Input";
import Button from "../components/ButtonUI";

const defaultImage = require("@/assets/images/favicon.png");
const cartonImage = require("@/assets/images/carton.png");
const invoiceImage = require("@/assets/images/invoice.png");
export default function Home() {
  return (
    <SafeAreaView>
      <View className="mx-6 mt-2 h-full">
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
              Nigeria{" "}
            </Text>
          </View>
          <View className="">
            <Text className="opacity-0">Hello</Text>
          </View>
        </View>
        <View className="">
          <View className="flex h-max flex-row items-center justify-between">
            <Input
              name="track"
              viewClassName="border-0"
              onChangeText={(text: string, value: string) => null}
              placeholder="Track your package number"
              iconName="search"
              className="w-[82%]"
            />
            <Pressable className="bg-[#ff7850] rounded-2xl h-14 mt-6 w-[15%] flex items-center justify-center">
              <Ionicons name="search" size={24} color={"white"} />
            </Pressable>
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
        <View className="mt-8">
          <View className="flex flex-row justify-between"><Text className="text-2xl font-medium">Courier Shipment</Text>
          <Text className="text-xl text-primary font-medium">See All</Text></View>
          
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mt-6"
          >
            <View className=" ml-2">
              <Button
                onPress={() => null}
                className="bg-white rounded-2xl w-40 h-32 mr-4 flex items-center justify-center"
              >
                <Ionicons name="document-text" size={24} color={"#ff7850"} />
                <Text className="text-lg font-medium mt-2">Documents</Text>
              </Button>
            </View>
            <View className=" ml-2">
              <Button
                onPress={() => null}
                className="bg-white rounded-2xl w-40 h-32 mr-4 flex items-center justify-center"
              >
                <Ionicons name="people" size={24} color={"#ff7850"} />
                <Text className="text-lg font-medium mt-2">Contacts</Text>
              </Button>
            </View>
          </ScrollView>
      </View>
      </View>
    </SafeAreaView>
  );
}
