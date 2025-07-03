import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "./lib/auth";
import { View } from "react-native";

export default function RootLayout() {
  return (
    <>
      <AuthProvider>
        <StatusBar style="dark" hidden={false} />

        <Stack
          screenOptions={{ animation: "slide_from_right", headerShown: false }}
        >
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="dashboard" options={{ headerShown: false }} />
        </Stack>
      </AuthProvider>
    </>
  );
}
