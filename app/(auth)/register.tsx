import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import Button from "../components/ButtonUI";
import Input from "../components/Input";
import axiosInstance from "../lib/axios";
type UserDetails = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
};
export default function Register() {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [error, setError] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (value: string, name: string) => {
    setUserDetails((val) => ({ ...val, [name]: value }) as any);
  };
  const validate = () => {
    const errors: Partial<UserDetails> = {};

    if (!userDetails?.firstName || userDetails.firstName.trim().length < 2) {
      errors.firstName = "First name is required.";
    } else {
      errors.firstName = undefined; // Clear error if valid
    }

    if (!userDetails?.lastName || userDetails.lastName.trim().length < 2) {
      errors.lastName = "Last name is required.";
    } else {
      errors.lastName = undefined; // Clear error if valid
    }

    if (!userDetails?.email || userDetails.email.trim().length === 0) {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userDetails.email)) {
      errors.email = "Invalid email format.";
    } else {
      errors.email = undefined; // Clear error if valid
    }

    if (!userDetails?.phone || userDetails.phone.trim().length === 0) {
      errors.phone = "Phone number is required.";
    } else if (userDetails.phone.length < 10) {
      errors.phone = "Phone number incomplete";
    } else {
      errors.phone = undefined; // Clear error if valid
    }

    if (!userDetails?.password || userDetails.password.trim().length === 0) {
      errors.password = "Password is required.";
    } else if (userDetails.password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    } else {
      errors.password = undefined; // Clear error if valid
    }

    setError((prev) => ({ ...prev, ...errors }) as any); // Update error state
    return Object.values(errors).every((error) => !error); // Return true if all fields are valid
  };
  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (!validate()) {
        return; // Stop submission if validation fails
      }
      const response = await axiosInstance.post("/auth/register", userDetails);

      console.log("Registration successful:", response.data);
      router.push("/(auth)/auth?type=login");
    } catch (error: any) {
      console.log("Error details:", error.response?.data || error.message);
      if (error.response.data.messages) {
        const errorMessages = error.response.data.messages.reduce(
          (acc: any, curr: any) => {
            acc[curr.name] = curr.message;
            return acc;
          },
          {},
        );
        console.log("Error messages:", errorMessages);
        setError(errorMessages);
      } else {
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <View className="bg-[#eef0f2] h-full">
      <View>
        <View className="flex flex-row justify-between  w-full p-2">
          <Input
            placeholder="First Name"
            value={userDetails?.firstName}
            name="firstName"
            error={error?.firstName}
            className="w-[48%]"
            onChangeText={handleChange}
            iconName="person-outline"
          />
          <Input
            placeholder="Last Name"
            name="lastName"
            value={userDetails?.lastName}
            error={error?.lastName}
            className="w-[48%]"
            onChangeText={handleChange}
            iconName="person-outline"
          />
        </View>
      </View>

      <Input
        placeholder="Email"
        keyboardType="email-address"
        value={userDetails?.email}
        error={error?.email}
        name="email"
        className="mx-2"
        onChangeText={handleChange}
        iconName="mail-outline"
      />

      <Input
        placeholder="Phone"
        keyboardType="phone-pad"
        name="phone"
        value={userDetails?.phone}
        error={error?.phone}
        className="mx-2"
        onChangeText={handleChange}
        iconName="call-outline"
      />

      <Input
        placeholder="Password"
        name="password"
        error={error?.password}
        value={userDetails?.password}
        secureTextEntry={true}
        className="mx-2"
        onChangeText={handleChange}
        iconName="lock-closed-outline"
      />

      <Text className="mt-4 text-right font-bold text-md text-primary">
        Forgot Password?
      </Text>
      <View className="w-full mt-4 h-14">
        <Button
          onPress={handleSubmit}
          disabled={
            !userDetails?.firstName ||
            !userDetails?.lastName ||
            !userDetails?.email ||
            !userDetails?.password ||
            !userDetails?.phone ||
            loading
          }
          className="mt-4 flex flex-row justify-center text-white items-center bg-primary h-14 rounded-[3rem]"
        >
          {" "}
          {loading ? (
            <ActivityIndicator size={"large"} color={"white"} />
          ) : (
            <Text className="text-white">Register</Text>
          )}
        </Button>
      </View>
    </View>
  );
}
