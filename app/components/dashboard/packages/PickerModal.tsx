import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Text, View } from "react-native";
import Button from "../../ButtonUI";

export default function PickerModal({
  setSelectedValue,
  header,
  type,
}: {
  header: string;
  type: "city" | "country" | "state";
  setSelectedValue: (value: string | null) => void;
}) {
  return (
    <View className="w-[32%] flex-1 mx-3 rounded-lg mt-6">
      <Text className="mb-2 text-subtext-light dark:text-subtext-dark capitalize">
        {type}
      </Text>
      <Button className="w-full flex-1 rounded-xl border-input-light dark:border-input-dark flex- border flex-row justify-center items-center">
        <Text className="mr-2">Select</Text>
        <Ionicons size={24} name="chevron-down-outline" className="" />
      </Button>
    </View>
  );
}
