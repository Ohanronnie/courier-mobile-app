import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "./lib/auth";
import { View } from "react-native";
import ThemeWrapper from "./ThemeWrapper";
import Ionicons from "@expo/vector-icons/Ionicons";
import { cssInterop } from "nativewind";
cssInterop(Ionicons, {
  className: {
    target: "style",
  },
});
export default function RootLayout() {
  return (
    <>
      <ThemeWrapper>
        <AuthProvider>
          <StatusBar style="auto" hidden={false} />

          <Stack
            screenOptions={{
              animation: "slide_from_right",
              headerShown: false,
            }}
          >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="dashboard" options={{ headerShown: false }} />
          </Stack>
        </AuthProvider>
      </ThemeWrapper>
    </>
  );
}
