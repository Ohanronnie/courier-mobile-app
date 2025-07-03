import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import Button from "../components/ButtonUI";
import Input from "../components/Input";
import axiosInstance from "../lib/axios";
export default function Login() {
  const [userDetails, setUserDetails] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ email?: string; password?: string }>({});
  const router = useRouter();
  const handleChange = (value: string, name: string) => {
    setUserDetails((val: any) => ({ ...val, [name]: value }));
  };
  const handleSubmit = async () => {
    setLoading(true);
    const errors: { email?: string; password?: string } = {};
    if (!userDetails.email || userDetails.email.trim().length === 0) {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userDetails.email)) {
      errors.email = "Invalid email format.";
    }
    if (!userDetails.password || userDetails.password.trim().length === 0) {
      errors.password = "Password is required.";
    } else if (userDetails.password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }
    setError(errors);
    console.log("Errors:", errors);
    if (Object.keys(errors).length === 0) {
      try {
        const response = await axiosInstance.post("/auth/login", userDetails);

        if (response.data) {
          // Assuming the response contains user data
          console.log("Login successful:", response.data);
          console.log(response.data.data.token, "JWT Token");
          await SecureStore.setItemAsync("JwtToken", response.data.data.token);
          router.push("/dashboard/home");
          // Navigate to the home screen or wherever you want
          // router.push("/home");
        }
      } catch (err: any) {
        console.error("Login error:", err);

        const errorResponse = err.response?.data;
        console.error("Error response:", errorResponse);
        if (errorResponse && errorResponse.messages) {
          const messages = errorResponse.messages.reduce(
            (acc: any, msg: any) => {
              acc[msg.name] = msg.message;
              return acc;
            },
            {},
          );
          setError(messages);
          console.error("Login error:", messages);
        } else {
          if (errorResponse && errorResponse.message) {
            if (errorResponse.message.includes("email")) {
              setError((prev) => ({ ...prev, email: errorResponse.message }));
            }
            if (errorResponse.message.includes("password")) {
              setError((prev) => ({
                ...prev,
                password: errorResponse.message,
              }));
            }
            if (errorResponse.message.includes("not found")) {
              setError((prev) => ({ ...prev, email: errorResponse.message }));
            }
          }
        }
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <View className="h-full">
      <Input
        name="email"
        value={userDetails.email}
        placeholder="Email"
        error={error?.email}
        className="mx-2"
        onChangeText={handleChange}
        iconName="mail-outline"
      />
      <Input
        name="password"
        value={userDetails.password}
        placeholder="Password"
        error={error?.password}
        secureTextEntry
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
          disabled={loading}
          className="mt-4 flex flex-row justify-center text-white items-center bg-primary h-14 rounded-[3rem]"
        >
          {loading ? (
            <ActivityIndicator size={"large"} color={"white"} />
          ) : (
            <Text className="text-white">Login</Text>
          )}{" "}
        </Button>
      </View>
    </View>
  );
}
