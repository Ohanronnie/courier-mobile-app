import { Text, View } from "react-native";
import { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import Input from "../../Input";
import Button from "../../ButtonUI";
import Ionicons from "@expo/vector-icons/Ionicons";
import { HorizontalLine } from "@/app/dashboard/home";
import parcelsValidationSchema, {
  validateParcels,
} from "@/app/lib/validators/parcel";
import { AddressType } from "./Address";

export type ParcelType = {
  name: string;
  description: string;
  weight: number;
  quantity: number;
  value: number;
  currency: string;
  type: "parcel" | "document";
};
export default function Parcel({
  moveToNextStep,
  localParcels,
  setLocalParcels,
}: {
  moveToNextStep: () => void;
  localParcels: ParcelType[];
  setLocalParcels: (parcels: ParcelType[]) => void;
}) {
  const [parcelDetails, setParcelDetails] = useState<ParcelType[]>([
    {
      name: "",
      description: "",
      weight: 0,
      quantity: 0,
      value: 0,
      currency: "",
      type: "parcel",
    },
  ]);
  const [errors, setErrors] = useState<ParcelType[] | null>(null);
  const handleChange = (index: number, field: string, value: string) => {
    const _parcel = [...parcelDetails];
    _parcel[index] = { ..._parcel[index], [field]: value };
    setParcelDetails(_parcel);
  };
  const handleSubmit = () => {
    const kErrors = validateParcels(parcelDetails);
    if (kErrors.length > 0) {
      console.log(kErrors);
      setErrors(kErrors as unknown as ParcelType[]);
    } else {
      setLocalParcels(parcelDetails);
      moveToNextStep();
    }
  };
  useEffect(() => {
    if (localParcels && localParcels.length > 0) {
      setParcelDetails(localParcels);
    }
  }, [localParcels]);
  return (
    <View className="mt-2">
      {parcelDetails.map((value, index, array) => {
        const handleInputChange = (value: string, field: string) => {
          handleChange(index, field, value);
        };
        const errorIndex = errors?.[index];
        return (
          <View key={index}>
            <Text className="text-xl font-medium text-center">
              Package {index + 1}
            </Text>
            <Input
              label="Product Name"
              placeholder="Product name"
              name="name"
              onChangeText={handleInputChange}
              value={parcelDetails[index]?.name}
              error={errors?.[index]?.name}
            />
            <Input
              label="Product description"
              placeholder="Description"
              name="description"
              viewClassName="h-24 border-[0.5px]"
              value={parcelDetails[index]?.description}
              onChangeText={handleInputChange}
              error={errors?.[index]?.description}
            />

            <View className="flex flex-row justify-between">
              <Input
                label="Product Weight (KG)"
                placeholder="Weight in KG"
                className="w-[48%]"
                name="weight"
                onChangeText={handleInputChange}
                value={parcelDetails[index]?.weight.toString()}
                error={errors?.[index]?.weight as any}
              />
              <Input
                label="Product Quantity"
                placeholder="Quantity"
                className="w-[48%]"
                name="quantity"
                onChangeText={handleInputChange}
                value={parcelDetails[index]?.quantity.toString()}
                error={errors?.[index]?.quantity as any}
              />
            </View>
            <View className="flex flex-row justify-between">
              <Input
                label="Product Value"
                placeholder="Product Value"
                className="w-[48%]"
                name="value"
                onChangeText={handleInputChange}
                value={parcelDetails[index]?.value.toString()}
                error={errors?.[index]?.value as any}
              />
              <Input
                label="Currency"
                value={parcelDetails[index]?.currency}
                placeholder="Currency"
                className="w-[48%]"
                name="currency"
                onChangeText={handleInputChange}
                error={errors?.[index]?.currency}
              />
            </View>
            <View className="mt-4 mb-1">
              <Text className="mb-2">Product Type</Text>
              <View className="border border-gray-300 rounded-md">
                <Picker
                  selectedValue={parcelDetails[index].type}
                  onValueChange={(itemValue) => {
                    const _parcel = [...parcelDetails];
                    _parcel[index] = { ..._parcel[index], type: itemValue };
                    setParcelDetails(_parcel);
                  }}
                >
                  <Picker.Item label="Parcel" value="parcel" />
                  <Picker.Item label="Document" value="document" />
                </Picker>
              </View>
            </View>
            <View className="flex flex-row justify-between">
              {index === array.length - 1 ? (
                <>
                  {array.length != 1 && (
                    <Button
                      onPress={() => {
                        setParcelDetails((prev) =>
                          array.length != 1
                            ? prev.filter((_, i) => i !== index)
                            : prev,
                        );
                      }}
                      className={`h-14 w-[40%] my-6 border border-slate-700 rounded-full p-0 text-black flex items-center justify-center`}
                    >
                      <View className="flex flex-row items-center justify-center">
                        <Text className="p-0 text-black">Remove 1</Text>
                      </View>
                    </Button>
                  )}
                  <Button
                    onPress={() =>
                      setParcelDetails((value) => [
                        ...value,
                        {
                          name: "",
                          description: "",
                          weight: 0,
                          quantity: 0,
                          value: 0,
                          currency: "",
                          type: "parcel",
                        },
                      ])
                    }
                    className={`h-14 ${array.length == 1 ? "w-full" : "w-[58%]"} my-6 bg--primary border border-slate-700 rounded-full p-0  text-black flex items-center justify-center`}
                  >
                    <View className="flex flex-row items-center justify-center">
                      <Ionicons name="add" size={16} color="black" />
                      <Text className=" p-0 text-primary ml-2">Add More</Text>
                    </View>
                  </Button>
                </>
              ) : (
                <View className="mt-3 mb-0 w--full"></View>
              )}
            </View>
          </View>
        );
      })}
      <Button
        onPress={() => {
          handleSubmit();
        }}
        className={`h-14 bg-primary mb-6 border border-slate-700 rounded-full p-0 text-black flex items-center justify-center`}
      >
        <View className="flex flex-row items-center justify-center">
          <Text className="p-0 text-white">Submit </Text>
        </View>
      </Button>
    </View>
  );
}
