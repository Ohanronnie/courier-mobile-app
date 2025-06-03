import { View, Text, StyleSheet, Dimensions } from "react-native";
import "@/global.css";
import { Image } from "expo-image";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import {
  useFonts,
  Inter_700Bold,
  Inter_700Bold_Italic,
  Inter_400Regular,
} from "@expo-google-fonts/inter";
import Button from "./components/Button";
import { Link, useRouter } from "expo-router";
import { useAuth } from "./utils/auth";

const CourierImage = require("@/assets/images/courier.jpg");

const { width, height } = Dimensions.get("window");

SplashScreen.preventAutoHideAsync();

export default function Index() {
  const router = useRouter();
  const [loaded, error] = useFonts({
    Inter_400Regular,
  });
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, loading: authLoading } = useAuth();
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);
  useEffect(() => {
    if (loaded && !authLoading) {
      setLoading(false);
      if (isAuthenticated) {
        router.replace("/dashboard/home");
      }
    }
  }, [loaded, authLoading, isAuthenticated, router]);
  if (!loaded && !error) {
    console.log("Error loading fonts", error);
    return null;
  }
  return (
    <View className="bg-[#0a0a0a] h-full">
      <View className="relative flex">
        <Image
          source={CourierImage}
          className="rounded-bl-xl inset-0 bg-black/50"
          style={styles.image}
        />
        <View className="absolute top-0 left-0 right-0 bottom-0 inset-0 bg-black/50" />
        <View className="left-5 text-gray-200 absolute top-36 ">
          <Text style={styles.text} className="text-6xl">
            Your Logistics{" "}
          </Text>
          <Text style={styles.text}>Partner For Seamless</Text>
          <Text style={styles.text}>Delivery</Text>
        </View>
      </View>
      <View className="mx-4 mt-3">
        <Text className="text-xl text-center font-normal text-white mt-10">
          Our Logistics Services provide end-to-end solutions for all shipping
          needs.
        </Text>
      </View>
      <View className="flex flex-row justify-center mx-4 mt-10">
        <Button
          onPress={() => router.push("/(auth)/auth?type=register")}
          icon="arrow-forward"
          iconSize={30}
          className="rounded-full w-20 h-20 flex justify-center items-center bg-[#ff7850]"
        ></Button>
      </View>
      <View className="mt-10 w-full bg-[#1c1c1c] h-[100%] pt-7 rounded-t-3xl">
        <Text className="text-white text-center ">
          Already have an account?
          <Link href={{ pathname: "/(auth)/auth", params: { type: "login" } }}>
            <Text className="text-[#ff7850] font-semibold ">Login</Text>
          </Link>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: width,
    height: height * 0.67,
    resizeMode: "cover",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  text: {
    fontFamily: "Inter_400Regular",
    fontSize: 35,
    color: "white",
    textShadowColor: "#000",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
});
