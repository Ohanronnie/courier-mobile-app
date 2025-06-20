import "@/global.css";
import { Inter_400Regular, useFonts } from "@expo-google-fonts/inter";
import { useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { Dimensions, View } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useAuth } from "./lib/auth";

const CourierImage = require("@/assets/images/icon.png");

SplashScreen.preventAutoHideAsync();

export default function Index() {
  const router = useRouter();
  const { width } = Dimensions.get("window");
  const offset = useSharedValue(0);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [loading, setLoading] = useState(true);

  const { isAuthenticated, loading: authLoading } = useAuth();

  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
  });

  // Animated styles for the image
  const animatedStyles = useAnimatedStyle(() => ({
    marginLeft: offset.value,
  }));

  // Handle animation logic
  useEffect(() => {
    offset.value = withTiming(200, { duration: 1000 }, (isFinished) => {
      if (isFinished) {
        runOnJS(setAnimationComplete)(true);
      }
    });

    return () => {
      offset.value = 0; // Reset offset on unmount
    };
  }, [offset]);

  // Handle splash screen and font loading
  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Handle navigation logic
  useEffect(() => {
    if (fontsLoaded && !authLoading) {
      setLoading(false);

      if (animationComplete) {
        if (isAuthenticated) {
          console.log("User is authenticated, redirecting to dashboard.");
          router.replace("/dashboard/home");
        } else {
          console.log("User is not authenticated, redirecting to auth page.");
          router.replace("/(auth)/default");
        }
      }
    }
  }, [fontsLoaded, authLoading, isAuthenticated, animationComplete, router]);

  // Handle font loading errors
  if (!fontsLoaded && !fontError) {
    console.log("Error loading fonts:", fontError);
    return null;
  }

  return (
    <View className="w-full h-full flex items--center justify-center">
      <Animated.Image
        source={CourierImage}
        style={[{ width: 160, height: 160 }, animatedStyles]}
      />
    </View>
  );
}
