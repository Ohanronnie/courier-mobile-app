import Ionicons from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs } from "expo-router";

export default function DashboardLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#121212",
        tabBarInactiveTintColor: "#888",
        headerShown: false,
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          marginTop: 10,
        },
        tabBarStyle: {
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
