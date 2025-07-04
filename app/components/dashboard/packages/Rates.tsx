import { useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { AddressType } from "./Address";
import { PackagingType } from "./Packaging";
import { ParcelType } from "./Parcel";
import axiosInstance from "@/app/lib/axios";
export type RateProps = {
  pickupAddress: AddressType;
  deliveryAddress: AddressType;
  parcel: ParcelType;
  packaging: PackagingType;
};

const Loading = () => {
  return (
    <View className="flex flex-row items-center justify-center">
      <ActivityIndicator size="large" />
    </View>
  );
};
const Rate = () => {
  return (
    <View>
      <Text className="text-black">Hello</Text>
    </View>
  );
};
export default function Rates({
  pickupAddress,
  deliveryAddress,
  parcel,
  packaging,
}: RateProps) {
  const [loading, setLoading] = useState<boolean>(true);
  
  console.log("hello");
  return loading ? <Loading /> : <Rate />;
}
