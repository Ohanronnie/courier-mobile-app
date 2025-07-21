import Ionicons from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";

export default function DashboardLayout() {
  const colorScheme = useColorScheme();

  const isDarkMode = colorScheme === "dark";

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: isDarkMode ? "#ffffff" : "#121212",
        tabBarInactiveTintColor: isDarkMode ? "#888888" : "#888",
        headerShown: false,
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          marginTop: 10,
        },
        tabBarStyle: {
          backgroundColor: isDarkMode ? "#161b21" : "#ffffff",
          borderTopWidth: 0,
          shadowColor: "transparent",
          height: 80,
          paddingVertical: 10,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="packages"
        options={{
          title: "Packages",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "cube" : "cube-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="shippings"
        options={{
          title: "Shipment",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "truck" : "truck-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "account" : "account-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
