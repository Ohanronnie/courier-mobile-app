import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import Button from "../../ButtonUI";
import Input from "../../Input";
import { useEffect, useState } from "react";
import CountryPicker from "react-native-country-picker-modal";
import { addressValidationSchema } from "@/app/lib/validators/address";
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
  const [countryCode, setCountryCode] = useState("US"); // Default country code
  const [isCountryPickerVisible, setIsCountryPickerVisible] = useState(false);
  const [callingCode, setCallingCode] = useState("1"); // Default calling code
  const [addressDetails, setAddressDetails] = useState<AddressType | null>({
    firstName: "",
    lastName: "",
    email: "",
    addressLine1: "",
    phone: "",
    city: "",
    state: "",
    country: "US",
    postalCode: "",
    callingCode: "",
  } as AddressType);

  const [errors, setErrors] = useState<AddressType | null>(null);

  useEffect(() => {
    if (type === "sender") {
      senderAddress && setAddressDetails(senderAddress as AddressType);
      senderAddress?.country && setCountryCode(senderAddress.country);
      senderAddress?.callingCode && setCallingCode(senderAddress.callingCode);
    } else if (type === "receiver") {
      receiverAddress && setAddressDetails(receiverAddress as AddressType);
      receiverAddress?.country && setCountryCode(receiverAddress.country);
      receiverAddress?.callingCode &&
        setCallingCode(receiverAddress.callingCode);
    }
  }, [senderAddress, receiverAddress, type]);
  const handleCountrySelect = (country: any) => {
    setCountryCode(country.cca2);
    handleChange(country.cca2, "country");
    setCallingCode(country.callingCode[0]);
    setIsCountryPickerVisible(false);
  };
  const handleChange = (text: string, name: string) => {
    setAddressDetails((add) => ({ ...add, [name]: text }) as AddressType);
  };
  const handleSubmit = () => {
    console.log("here too");
    const { error } = addressValidationSchema.validate(addressDetails, {
      abortEarly: false,
    });
    if (error) {
      console.log(error);
      const errorMessages: Record<string, string> = {};
      error.details.forEach((err) => {
        errorMessages[err.path[0]] = err.message;
      });
      setErrors(errorMessages as unknown as AddressType);

      return;
    }
    console.log("Hello x");
    if (type === "sender" && setSenderAddress) {
      console.log(countryCode, "countryCode");
      console.log(addressDetails?.country);
      setSenderAddress({
        ...addressDetails,
        country: addressDetails?.country || countryCode,
        callingCode,
      } as AddressType);
    } else if (type === "receiver" && setReceiverAddress) {
      setReceiverAddress({
        ...addressDetails,
        country: addressDetails?.country || countryCode,
        callingCode,
      } as AddressType);
    }
    console.log("here x");
    moveToNextStep();
  };
  return (
    <View className="pb-8">
      <View className="">
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
        <View>
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
          <View className="w-full flex flex-row justify-between">
            <View className="h-full w-[32%] mt-5">
              <Text>Country</Text>
              <TouchableOpacity
                onPress={() => setIsCountryPickerVisible(true)}
                className="flex flex-row items-center p-3 border border-gray-300 rounded-lg bg-white mt-3"
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
                  className="mr-3 px-3 py- border border-gray-300 rounded-lg"
                  onPress={() => setIsCountryPickerVisible(true)}
                >
                  <Text className="text-base text-gray-700">{countryCode}</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
            <Input
              onChangeText={handleChange}
              name="state"
              placeholder="State"
              label="State"
              className="w-[32%]"
              error={errors?.state}
              value={addressDetails?.state}
            />
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
          <View>
            <Text className="mt-5">Phone Number</Text>

            <View className="flex flex-row items-center p-3 border border-gray-300 rounded-lg bg-white mt-3">
              {/* Country Picker */}
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
                className="mr-3 px-3 py-2 border border-gray-300 rounded-lg"
                onPress={() => setIsCountryPickerVisible(true)}
              >
                <Text className="text-base text-gray-700">+{callingCode}</Text>
              </TouchableOpacity>

              <TextInput
                className="flex-1 text-base p-2"
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
      </View>
      <Button
        onPress={handleSubmit}
        className="h-16  mt-6 rounded-full p-0 bg-primary flex items-center justify-center"
      >
        <Text className="text-white p-0">Save and Continue</Text>
      </Button>
    </View>
  );
}
