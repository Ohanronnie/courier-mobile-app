import { Text, View } from "react-native";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import Input from "../../Input";
import Button from "../../ButtonUI";

export default function Parcel() {
  const [selectedParcel, setSelectedParcel] = useState("parcel"); // Default currency

  return (
    <View className="mt-2">
      <View>
        <Input label="Product Name" placeholder="Product name" />
        <Input
          label="Product description"
          placeholder="Description"
          viewClassName="h-24 border-[0.5px]"
        />

        <View className="flex flex-row justify-between">
          <Input
            label="Product Weight (KG)"
            placeholder="Weight in KG"
            className="w-[48%]"
          />
          <Input
            label="Product Quantity"
            placeholder="Quantity"
            className="w-[48%]"
          />
        </View>
        <View className="flex flex-row justify-between">
          <Input
            label="Product Value"
            placeholder="Product Value"
            className="w-[48%]"
          />
          <Input label="Currency" placeholder="Currency" className="w-[48%]" />
        </View>
        <View className="mt-4 mb-1">
          <Text className="mb-2">Product Type</Text>
          <View className="border border-gray-300 rounded-md">
            <Picker
              selectedValue={selectedParcel}
              onValueChange={(itemValue) => setSelectedParcel(itemValue)}
            >
              <Picker.Item label="Parcel" value="parcel" />
              <Picker.Item label="Document" value="document" />
            </Picker>
          </View>
        </View>
        <Button
          onPress={() => null}
          className="h-16  my-6 rounded-full p-0 bg-primary flex items-center justify-center"
        >
          <Text className="text-white p-0">Save and Continue</Text>
        </Button>
      </View>
    </View>
  );
}
