import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StepsIndicator from "../components/StepsIndicator";
import Input from "../components/Input";
import { HorizontalLine } from "./home";
import Button from "../components/ButtonUI";
import Address from "../components/dashboard/packages/Address";
import Parcel from "../components/dashboard/Parcel";

export default function Packages() {
  return (
    <SafeAreaView>
      <View className="mt-4 mx-4">
        <View className="flex flex-row items-center justify-between">
          <Pressable className="bg-white flex  h-10 w-10  rounded-full items-center justify-center ">
            <Ionicons name="chevron-back" size={24} />
          </Pressable>
          <Text className="text-xl font-medium">Send Package</Text>
          <Ionicons name="chevron-back" className="opacity-0" size={24} />
        </View>
        <View className="mt-4">
          <StepsIndicator
            steps={["Pickup Address", "Delivery Address", "Parcel Create", "Shipment"]}
            currentStep={0}
          />
        </View>
        <View className="mt-4">
         <HorizontalLine />
        </View>
        { <Parcel />}
      </View>
    </SafeAreaView>
  );
}
