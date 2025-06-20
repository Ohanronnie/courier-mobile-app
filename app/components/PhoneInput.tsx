import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import CountryPicker from "react-native-country-picker-modal";

export const PhoneInputScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState<any>("US"); // Default country code
  const [callingCode, setCallingCode] = useState("1"); // Default calling code
  const [isCountryPickerVisible, setIsCountryPickerVisible] = useState(false);

  const handleCountrySelect = (country: any) => {
    setCountryCode(country.cca2);
    setCallingCode(country.callingCode[0]);
    setIsCountryPickerVisible(false);
  };

  return (
    <View className="flex flex-row items-center p-3 border border-gray-300 rounded-lg bg-white mt-3">
      {/* Country Picker */}
      <TouchableOpacity
        className="mr-3 px-3 py-2 border border-gray-300 rounded-lg"
        onPress={() => setIsCountryPickerVisible(true)}
      >
        <Text className="text-base text-gray-700">+{callingCode}</Text>
      </TouchableOpacity>
      <CountryPicker
        withFilter
        withFlag
        withCallingCode
        withCountryNameButton={false}
        onSelect={handleCountrySelect}
        visible={isCountryPickerVisible}
        onClose={() => setIsCountryPickerVisible(false)}
        countryCode={countryCode}
      />

      {/* Phone Number Input */}
      <TextInput
        className="flex-1 text-base p-2"
        placeholder="Enter phone number"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
    </View>
  );
};

export default PhoneInputScreen;
