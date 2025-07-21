import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React, { ReactNode, useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/ButtonUI";
import Address from "../components/dashboard/packages/Address";
import StepsIndicator from "../components/StepsIndicator";
import { HorizontalLine } from "./home";
import axiosInstance from "../lib/axios";
function CreateModal({
  visible,
  onClose,
  component,
  header,
}: {
  component: ReactNode;
  visible: boolean;
  onClose: () => void;
  header: string;
}) {
  if (!visible) return null;
  return (
    <ScrollView
      className="flex-1 bg-surface-light dark:bg-surface-dark"
      showsVerticalScrollIndicator={false}
    >
      <Modal
        animationType="slide"
        transparent={false}
        visible={visible}
        onRequestClose={onClose}
        className=""
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="bg-surface-light dark:bg-surface-dark px-4 pt-8 flex-1  shadow-lg"
        >
          <View className="w-full px-2 flex bg-surface-light dark:bg-surface-dark flex-row justify-between items-center  shadow-md">
            <Text className="text-lg text-text-light dark:text-text-dark font-semibold mb-4">
              {header}
            </Text>
            <Button
              onPress={onClose}
              className="bg-surface-light dark:bg-surface-dark border border-input-light dark:border-input-dark text-white p-1 rounded-full flex flex-row justify-center items-center mb-4"
            >
              <Ionicons
                name="close-outline"
                size={24}
                className="text-text-light dark:text-text-dark"
              ></Ionicons>
            </Button>
          </View>
          <HorizontalLine />
          <ScrollView className="">{component}</ScrollView>
        </ScrollView>
      </Modal>
    </ScrollView>
  );
}
export default function Packages() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [pickupModal, setPickupModal] = useState(false);
  useEffect(() => {
    
  })
  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView className="flex-1">
          <Text className="text-xl text-center mt-2 text-text-light dark:text-text-dark">
            Ship your package
          </Text>
          <View className="p-4">
            <StepsIndicator
              steps={[
                "Pickup Address",
                "Delivery Address",
                "Parcel Create",
                "Packaging",
                "Confirm",
                "Courier",
              ]}
              currentStep={currentStep}
            />
            <HorizontalLine />
          </View>
          <View className="mt-4 mx-4 bg-surface-light dark:bg-surface-dark py-8 px-4 flex flex-row justify-between items-center rounded-lg shadow-md">
            <View>
              <Text className="text-lg font-semibold mb-2 text-text-light dark:text-text-dark">
                Pickup Address
              </Text>
              <Text className="text-subtext-light dark:text-subtext-dark">
                Add a pickup address.
              </Text>
            </View>

            <View className="">
              <Button
                onPress={() => setPickupModal(true)}
                className="bg-surface-light dark:bg-surface-dark border border-input-light dark:border-input-dark text-white w-16 h-8 rounded-xl flex flex-row justify-center items-center"
              >
                <Ionicons
                  name="create-outline"
                  size={12}
                  className="text-subtext-light dark:text-subtext-dark mr-1"
                ></Ionicons>
                <Text className="text-subtext-light dark:text-subtext-dark">
                  Edit
                </Text>
              </Button>
            </View>
          </View>
          <View className="mt-4 mx-4 bg-surface-light dark:bg-surface-dark py-8 px-4 flex flex-row justify-between items-center rounded-lg shadow-md">
            <View>
              <Text className="text-lg font-semibold mb-2 text-text-light dark:text-text-dark">
                Pickup Address
              </Text>
              <Text className="text-subtext-light dark:text-subtext-dark">
                Add a pickup address.
              </Text>
            </View>

            <View className="">
              <Button
                onPress={() => setPickupModal(true)}
                className="bg-surface-light dark:bg-surface-dark border border-input-light dark:border-input-dark text-white w-16 h-8 rounded-xl flex flex-row justify-center items-center"
              >
                <Ionicons
                  name="create-outline"
                  size={12}
                  className="text-subtext-light dark:text-subtext-dark mr-1"
                ></Ionicons>
                <Text className="text-subtext-light dark:text-subtext-dark">
                  Edit
                </Text>
              </Button>
            </View>
          </View>
          <CreateModal
            visible={pickupModal}
            onClose={() => setPickupModal(false)}
            component={<Address />}
            header="Pickup Address"
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
