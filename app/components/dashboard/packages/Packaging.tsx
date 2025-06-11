import { View, Text } from "react-native";
import Input from "../../Input";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import Button from "../../ButtonUI";

export default function Packaging() {
  const [selectedParcel, setSelectedParcel] = useState("box"); // Default package type
  return (
    <View>
      <View>
        <Input label="Package Name" placeholder="Name" className="w-full" />
      </View>
      <View className="flex flex-row justify-between">
        <Input
          label="Package Height"
          placeholder="Height"
          className="w-[32%]"
        />
        <Input label="Package Width" placeholder="Width" className="w-[32%]" />
        <Input
          label="Package Length"
          placeholder="Length"
          className="w-[32%]"
        />
      </View>
      <Input
        label="Package Weight"
        placeholder="Weight"
        className="w-full mt-2"
      />
      <View className="mt-6 mb-1">
        <Text className="mb-2">Wrapper Type</Text>
        <View className="border border-gray-300 rounded-md">
          <Picker
            selectedValue={selectedParcel}
            onValueChange={(itemValue) => setSelectedParcel(itemValue)}
          >
            <Picker.Item label="Box" value="box" />
            <Picker.Item label="Envelope" value="envelope" />
            <Picker.Item label="Pallet" value="pallet" />
          </Picker>
        </View>
      </View>

      <Button
        onPress={() => null}
        className="h-16 mt-6 rounded-full p-0 bg-primary flex items-center justify-center"
      >
        <Text className="text-white p-0">Save and Continue</Text>
      </Button>
    </View>
  );
}
