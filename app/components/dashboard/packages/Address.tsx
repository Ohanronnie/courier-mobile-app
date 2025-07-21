import { addressValidationSchema } from "@/app/lib/validators/address";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CountryPicker from "react-native-country-picker-modal";
import Button from "../../ButtonUI";
import Input from "../../Input";
import PickerModal from "./PickerModal";

type AddressProps = {
  moveToNextStep: () => void;
  type: "sender" | "receiver";
  setSenderAddress?: (address: AddressType) => void;
  setReceiverAddress?: (address: AddressType) => void;
  senderAddress?: AddressType | null;
  receiverAddress?: AddressType | null;
};

export type AddressType = {
  type: "sender" | "receiver";
  countryName: string;
  firstName: string;
  lastName: string;
  email: string;
  addressLine1: string;
  addressLine2?: string;
  phone: string;
  city: string;
  state: string;
  country: string; // Must be a 2-character uppercase code (e.g., US, GB)
  postalCode: string;
  callingCode: string; // Optional
};

export default function Address({
  moveToNextStep,
  type,
  senderAddress,
  receiverAddress,
  setSenderAddress,
  setReceiverAddress,
}: AddressProps) {
  const [countryCode, setCountryCode] = useState("US");
  const [isCountryPickerVisible, setIsCountryPickerVisible] = useState(false);
  const [callingCode, setCallingCode] = useState("1");
  const [addressDetails, setAddressDetails] = useState<
    AddressType | null | undefined
  >({
    firstName: "",
    lastName: "",
    email: "",
    addressLine1: "",
    phone: "",
    city: "",
    state: "",
    country: "US",
    countryName: "United States",
    postalCode: "",
    callingCode: "",
  } as AddressType);
  const [errors, setErrors] = useState<AddressType | null>(null);

  // Initialize address details based on the type (sender/receiver)
  useEffect(() => {
    const initializeAddress = (address: AddressType | null | undefined) => {
      if (address) {
        setAddressDetails(address);
        setCountryCode(address.country || "US");
        setCallingCode(address.callingCode || "1");
      }
    };

    if (type === "sender") {
      initializeAddress(senderAddress);
    } else if (type === "receiver") {
      initializeAddress(receiverAddress);
    }
  }, [senderAddress, receiverAddress, type]);

  // Handle changes to input fields
  const handleChange = (text: string, name: string) => {
    setAddressDetails((prev) => ({ ...prev, [name]: text } as AddressType));
  };

  // Handle country selection
  const handleCountrySelect = (country: any) => {
    setCountryCode(country.cca2);
    handleChange(country.cca2, "country");
    handleChange(country.name, "countryName");
    setCallingCode(country.callingCode[0]);
    setIsCountryPickerVisible(false);
  };

  // Validate and submit the form
  const handleSubmit = () => {
    const { error } = addressValidationSchema.validate(addressDetails, {
      abortEarly: false,
    });

    if (error) {
      const errorMessages: Record<string, string> = {};
      error.details.forEach((err) => {
        errorMessages[err.path[0]] = err.message;
      });
      setErrors(errorMessages as unknown as AddressType);
      return;
    }

    const updatedAddress = {
      ...addressDetails,
      country: addressDetails?.country || countryCode,
      callingCode,
    } as AddressType;

    if (type === "sender" && setSenderAddress) {
      setSenderAddress(updatedAddress);
    } else if (type === "receiver" && setReceiverAddress) {
      setReceiverAddress(updatedAddress);
    }

    moveToNextStep();
  };

  return (
    <ScrollView className="pb-16 bg-surface-light dark:bg-surface-dark">
      <View>
        {/* Name Fields */}
        <View className="flex flex-row justify-between">
          <Input
            onChangeText={handleChange}
            name="firstName"
            placeholder="First Name"
            label="First Name"
            className="w-[48%] h-10"
            error={errors?.firstName}
            value={addressDetails?.firstName}
          />
          <Input
            onChangeText={handleChange}
            name="lastName"
            placeholder="Last Name"
            label="Last Name"
            className="w-[48%]"
            error={errors?.lastName}
            value={addressDetails?.lastName}
          />
        </View>

        {/* Email Field */}
        <Input
          onChangeText={handleChange}
          name="email"
          placeholder="Email"
          label="Email"
          className="w-full"
          keyboardType="email-address"
          error={errors?.email}
          value={addressDetails?.email}
        />

        {/* Address Fields */}
        <Input
          onChangeText={handleChange}
          name="addressLine1"
          placeholder="Address Line 1"
          label="Address Line 1"
          className="w-full"
          error={errors?.addressLine1}
          value={addressDetails?.addressLine1}
        />
        <Input
          onChangeText={handleChange}
          name="addressLine2"
          placeholder="Address Line 2 (Optional)"
          label="Address Line 2"
          className="w-full"
          error={errors?.addressLine2}
          value={addressDetails?.addressLine2}
        />

        {/* Country, State, and City Fields */}
        <View className="w-full flex flex-row flex-1 justify-between">
          <View className="h-full w-[32%] mt-5">
            <Text className="text-subtext-light dark:text-subtext-dark">
              Country
            </Text>
            <TouchableOpacity
              onPress={() => setIsCountryPickerVisible(true)}
              className="flex flex-row items-center p-2 border border-input-light dark:border-input-dark rounded-lg bg-surface-light dark:bg-surface-dark mt-3"
            >
              <CountryPicker
                withFilter
                withFlag
                withCallingCode
                withCountryNameButton={false}
                onSelect={handleCountrySelect}
                visible={isCountryPickerVisible}
                onClose={() => setIsCountryPickerVisible(false)}
                countryCode={countryCode as any}
              />
              <TouchableOpacity
                className="mr-3 px-3 py-2 border border-input-light dark:border-input-dark rounded-lg"
                onPress={() => setIsCountryPickerVisible(true)}
              >
                <Text className="text-base text-subtext-light dark:text-subtext-dark">
                  {countryCode}
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
          <PickerModal header="Select State" setSelectedValue={(val: any) => null} type="state"/>

          <Input
            onChangeText={handleChange}
            name="city"
            placeholder="City"
            label="City"
            className="w-[32%]"
            error={errors?.city}
            value={addressDetails?.city}
          />
        </View>

        {/* Phone Number Field */}
        <View>
          <Text className="mt-5 text-subtext-light dark:text-subtext-dark">
            Phone Number
          </Text>
          <View className="flex flex-row items-center p-2 border border-input-light dark:border-input-dark rounded-lg bg-surface-light dark:bg-surface-dark mt-3">
            <CountryPicker
              withFilter
              withFlag
              withCallingCode
              withCountryNameButton={false}
              onSelect={handleCountrySelect}
              visible={isCountryPickerVisible}
              onClose={() => setIsCountryPickerVisible(false)}
              countryCode={countryCode as any}
            />
            <TouchableOpacity
              className="mr-3 px-3 py-2 border border-input-light dark:border-input-dark rounded-lg"
              onPress={() => setIsCountryPickerVisible(true)}
            >
              <Text className="text-base text-subtext-light dark:text-subtext-dark">
                +{callingCode}
              </Text>
            </TouchableOpacity>
            <TextInput
              className="flex-1 text-base p-2 text-subtext-light dark:text-subtext-dark placeholder:text-subtext-light placeholder:dark:text-subtext-dark"
              placeholder="Enter phone number"
              keyboardType="phone-pad"
              onChangeText={(text) => handleChange(text, "phone")}
              value={addressDetails?.phone || ""}
              maxLength={15}
            />
          </View>
          {errors?.phone && (
            <Text className="text-red-500 mt-1">{errors?.phone}</Text>
          )}
        </View>

        {/* Postal Code Field */}
        <Input
          onChangeText={handleChange}
          name="postalCode"
          placeholder="Postal Code"
          label="Postal Code"
          className="w-full"
          keyboardType="numeric"
          error={errors?.postalCode}
          value={addressDetails?.postalCode}
        />
      </View>

      {/* Submit Button */}
      <Button
        onPress={handleSubmit}
        className="h-16 mt-6 rounded-full p-0 bg-primary flex items-center justify-center"
      >
        <Text className="text-white">Save and Continue</Text>
      </Button>
    </ScrollView>
  );
}
