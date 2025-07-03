import { Text, View } from "react-native";
import Button from "../../ButtonUI";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { AddressType } from "./Address";
import { ParcelType } from "./Parcel";
import { PackagingType } from "./Packaging";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HorizontalLine } from "@/app/dashboard/home";

export default function Confirm() {
  const router = useRouter();
  const [senderAddress, setSenderAddress] = useState<AddressType | null>(null);
    const [receiverAddress, setReceiverAddress] = useState<AddressType | null>(
      null,
    );
    const [localParcels, setLocalParcels] = useState<ParcelType[]>([]);
    const [localPackaging, setLocalPackaging] = useState<PackagingType | null>(
      null);
      
  useEffect(() => {
    if (!senderAddress) {
      AsyncStorage.getItem("senderAddress").then((data) => {
        if (data) {
          setSenderAddress(JSON.parse(data));
        }
      });
    } else {
      AsyncStorage.setItem("senderAddress", JSON.stringify(senderAddress));
    }
    if (!receiverAddress) {
      AsyncStorage.getItem("receiverAddress").then((data) => {
        if (data) {
          setReceiverAddress(JSON.parse(data));
        }
      });
    } else {
      AsyncStorage.setItem("receiverAddress", JSON.stringify(receiverAddress));
    }
    if (localParcels.length === 0) {
      AsyncStorage.getItem("localParcels").then((value) => {
        if (value) {
          setLocalParcels(JSON.parse(value));
        }
      });
    } else {
      AsyncStorage.setItem("localParcels", JSON.stringify(localParcels));
    }
    if (!localPackaging) {
      AsyncStorage.getItem("localPackaging").then((value) => {
        if (value) {
          setLocalPackaging(JSON.parse(value));
        }
      });
    } else {
      AsyncStorage.setItem("localPackaging", JSON.stringify(localPackaging));
    }
  }, [router]);
  return (
    <View>
      <Text className="text-3xl">Review your shipment</Text>
      <View className="mt-4 bg-white p-4 rounded-lg shadow-md">
        <Text className="text-lg font-semibold">Pickup</Text>
        <View>
          <Text>
            {senderAddress?.firstName}
            {""}
            {senderAddress?.lastName}
          </Text>
          <Text>
            {senderAddress?.addressLine1}, {senderAddress?.state},{" "}
            {senderAddress?.city}, {senderAddress?.country}
          </Text>
          <Text>+{senderAddress?.callingCode}{senderAddress?.phone}</Text>
          <Text>{senderAddress?.postalCode}</Text>
        </View>
        <View className="flex flex-row-reverse w-full">
          <Button
            className="mt-4 bg-primary text-white w-16 h-7 rounded-lg flex flex-row justify-center items-center"
            onPress={() => router.push(`/dashboard/packages?step=${0}`)}
          >
            <Ionicons
              name="create-outline"
              size={12}
              color={"white"}
              className="text-white mr-1"
            ></Ionicons>
            <Text className="text-white">Edit</Text>
          </Button>
        </View>
      </View>
      <View className="mt-4 bg-white p-4 rounded-lg shadow-md">
        <Text className="text-lg font-semibold">Delivery</Text>
        <View>
          <Text>
            {receiverAddress?.firstName}
            {""}
            {receiverAddress?.lastName}
          </Text>
          <Text>
            {receiverAddress?.addressLine1}, {receiverAddress?.state},{" "}
            {receiverAddress?.city}, {receiverAddress?.country}
          </Text>
          <Text>+{receiverAddress?.callingCode}{receiverAddress?.phone}</Text>
          <Text>{receiverAddress?.postalCode}</Text>
        </View>
        <View className="flex flex-row-reverse w-full">
          <Button
            className="mt-4 bg-primary text-white w-16 h-7 rounded-lg flex flex-row justify-center items-center"
            onPress={() => router.push(`/dashboard/packages?step=${1}`)}
          >
            <Ionicons
              name="create-outline"
              size={12}
              color={"white"}
              className="text-white mr-1"
            ></Ionicons>
            <Text className="text-white">Edit</Text>
          </Button>
        </View>
      </View>
      <View className="mt-4 bg-white p-4 rounded-lg shadow-md">
        <Text className="text-lg font-semibold">Parcel</Text>
        {localParcels.map((current, index, array) => (
          <>
            <View key={index} className="my-2">
              <Text>Name - {current?.name}</Text>
              <Text>
                Weight - {current.weight} kg * Quantity - {current.quantity} 23
              </Text>

              <Text>
                Value - {current.currency}
                {current.value}
              </Text>
              <Text>Product Type - {current.type}</Text>
            </View>
            {index != array.length -1 && <HorizontalLine />}
          </>
        ))}

        <View className="flex flex-row-reverse w-full">
          <Button
            className="mt-4 bg-primary text-white w-16 h-7 rounded-lg flex flex-row justify-center items-center"
            onPress={() => router.push(`/dashboard/packages?step=${2}`)}
          >
            <Ionicons
              name="create-outline"
              size={12}
              color={"white"}
              className="text-white mr-1"
            ></Ionicons>
            <Text className="text-white">Edit</Text>
          </Button>
        </View>
      </View>
      <View className="mt-4 bg-white p-4 rounded-lg shadow-md">
        <Text className="text-lg font-semibold">Packaging</Text>
        <View>
          <Text>Name - {localPackaging?.name}</Text>
          <Text>
            Dimensions - {localPackaging?.height}*{localPackaging?.width}*
            {localPackaging?.length}
          </Text>

          <Text>Weight - {localPackaging?.weight}kg</Text>
          <Text>Wrapper Type - {localPackaging?.wrapper}</Text>
        </View>
        <View className="flex flex-row-reverse w-full">
          <Button
            className="mt-4 bg-primary text-white w-16 h-7 rounded-lg flex flex-row justify-center items-center"
            onPress={() => router.push(`/dashboard/packages?step=${3}`)}
          >
            <Ionicons
              name="create-outline"
              size={12}
              color={"white"}
              className="text-white mr-1"
            ></Ionicons>
            <Text className="text-white">Edit</Text>
          </Button>
        </View>
      </View>
      <Button
        onPress={() => null}
        className="h-16  mt-6 rounded-full p-0 bg-primary flex items-center justify-center"
      >
        <Text className="text-white p-0">Continue</Text>
      </Button>
    </View>
  );
}