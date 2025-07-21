import axiosInstance from "@/app/lib/axios";
import { Image } from "expo-image";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { AddressType } from "./Address";
import { PackagingType } from "./Packaging";
import { ParcelType } from "./Parcel";
export type RateProps = {
  pickupAddress: AddressType;
  deliveryAddress: AddressType;
  parcel: ParcelType[];
  packaging: PackagingType;
};

const Loading = () => {
  return (
    <View className="flex flex-row items-center justify-center">
      <ActivityIndicator size="large" />
    </View>
  );
};
const Rate = ({ rates }: { rates: any }) => {
  console.log(rates);
  return (
    <View>
      {rates &&
        rates.map((value: any) => (
          <View className="w-full bg-gray-50 shadow-md rounded-lg mt-4 px-6 py-6">
            <View className="flex flex-row justify-between items-center mb-4">
              <View className="flex flex-row items-center">
                <Image
                  className="rounded-full border w-14 h-14 border-gray-300"
                  source={value.carrier_logo}
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 28,
                    borderColor: "gray",
                    borderWidth: 1,
                  }}
                  contentFit="cover"
                  alt="Carrier Logo"
                />
                <Text className="ml-4 text-lg font-semibold text-gray-800">
                  {value.carrier_name}
                </Text>
              </View>
              <Text className="text-xl font-bold text-gray-900">
                {value.currency} {(value.amount as number).toLocaleString()}
              </Text>
            </View>
            <View className="border-t border-gray-200 pt-4">
              <Text className="text-sm text-gray-600 mb-1">
                <Text className="font-medium text-gray-800">Pickup:</Text>{" "}
                {value.pickup_time}
              </Text>
              <Text className="text-sm text-gray-600">
                <Text className="font-medium text-gray-800">Delivery:</Text>{" "}
                {value.delivery_time}
              </Text>
            </View>
          </View>
        ))}
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
  const [pickupAddressId, setPickupAddressId] = useState(null);
  const [deliveryAddressId, setDeliveryAddressId] = useState(null);
  const [packagingId, setPackagingId] = useState(null);
  const [parcelId, setParcelId] = useState(null);
  const [rates, setRates] = useState<any>(null);
  async function submitAddress(type: "sender" | "receiver") {
    try {
      const address = type === "sender" ? pickupAddress : deliveryAddress;
      console.log("Submitting address for type:", type);
      console.log(
        address ? JSON.stringify(address, null, 2) : "No address provided"
      );
      const response = await axiosInstance.post("/address/create", {
        ...address,
        phone: "+" + address.callingCode + address.phone,
        country: address.countryName,
        type,
      });
      const addressId = response.data.data.addressId;

      type == "sender"
        ? setPickupAddressId(addressId)
        : setDeliveryAddressId(addressId);

      return addressId;
    } catch (err: any) {
      console.log("error at submitAddress: -", type);
      console.log(JSON.stringify(err?.response?.data, null, 2), null, 2);
      throw err;
    }
  }
  const submitPackaging = async () => {
    try {
      const response = await axiosInstance.post("/parcel/package/create", {
        height: Number(packaging.height),
        width: Number(packaging.width),
        length: Number(packaging.length),
        name: packaging.name,
        type: packaging.wrapper,
        weight: Number(packaging.weight),
      });
      console.log(response.data.data);
      setPackagingId(response.data.data);
      return response.data.data;
    } catch (error: any) {
      console.log(JSON.stringify(error?.response?.data, null, 2));
    }
  };
  const submitParcel = async (packagingId: string) => {
    const transform = (item: ParcelType) => {
      return {
        name: item.name,
        description: item.description,
        type: item.type,
        currency: item.currency,
        quantity: Number(item.quantity),
        weight: Number(item.weight),
        value: Number(item.value),
      };
    };
    try {
      const data = {
        description: "Parcels",
        packagingId: packagingId,
        items: parcel.map(transform),
      };
      const response = await axiosInstance.post("/parcel/create", data);
      setParcelId(response.data.data);
      return response.data.data;
    } catch (error: any) {
      console.log(JSON.stringify(error?.response.data, null, 2));
    }
  };
  const getRates = async (
    currency: string,
    pickupId: string,
    deliveryId: string,
    parcelId: string
  ) => {
    try {
      const response = await axiosInstance.post("/shipments/rates", {
        deliveryAddress: deliveryId,
        pickupAddress: pickupId,
        parcelId,
        currency,
      });
      setRates(response.data.data);
      console.log(JSON.stringify(response.data.data, null, 2));
    } catch (error: any) {
      console.log(JSON.stringify(error?.response.data, null, 2));
    }
  };
  const submitFn = useCallback(async () => {
    const _pickupId = await submitAddress("sender");
    const _deliveryId = await submitAddress("receiver");
    const _packagingId = await submitPackaging();
    const _parcel = await submitParcel(_packagingId);
    const rates = await getRates("NGN", _pickupId, _deliveryId, _parcel);
    setLoading(false);
  }, []);
  useEffect(() => {
    console.log(rates?.length, "rates length");
    !rates && submitFn();
  }, [submitFn, rates]);
  return loading ? <Loading /> : <Rate rates={rates} />;
}
