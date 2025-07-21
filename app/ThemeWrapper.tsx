// components/ThemeWrapper.js
import { useColorScheme } from "react-native";
import { View } from "react-native";
import React from "react";

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const scheme = useColorScheme();
  const themeClass = scheme === "dark" ? "dark" : "";

  console.log("Current theme:", themeClass);
  return <View className={`${themeClass} flex-1`}>{children}</View>;
}
