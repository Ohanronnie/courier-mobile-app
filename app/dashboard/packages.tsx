import Ionicons from "@expo/vector-icons/Ionicons";
import {
  BackHandler,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StepsIndicator from "../components/StepsIndicator";
import Input from "../components/Input";
import { HorizontalLine } from "./home";
import Button from "../components/ButtonUI";
import Address, { AddressType } from "../components/dashboard/packages/Address";
import Parcel, { ParcelType } from "../components/dashboard/packages/Parcel";
import { ScrollView } from "react-native";
import Packaging, {
  PackagingType,
} from "../components/dashboard/packages/Packaging";
import Shipment from "../components/dashboard/packages/Shipment";
import { PhoneInputScreen } from "../components/PhoneInput";
import { useLocalSearchParams, useRouter } from "expo-router";
import { use, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Confirm from "../components/dashboard/packages/Confirm";
export default function Packages() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [senderAddress, setSenderAddress] = useState<AddressType | null>(null);
  const [receiverAddress, setReceiverAddress] = useState<AddressType | null>(
    null,
  );
  const [localParcels, setLocalParcels] = useState<ParcelType[]>([]);
  const [localPackaging, setLocalPackaging] = useState<PackagingType | null>(
    null,
  );
  const { step } = useLocalSearchParams();
  const moveToNextStep = () => {
    if (currentStep < 5) {
      router.replace(`/dashboard/packages?step=${currentStep + 1}`);
    } else {
      console.log("All steps completed");
    }
  };
  useEffect(() => {
    if (step) {
      const stepNumber = parseInt(step as string, 10);
      if (!isNaN(stepNumber) && stepNumber >= 0 && stepNumber <= 4) {
        setCurrentStep(stepNumber);
        AsyncStorage.setItem("currentStep", currentStep.toString() || "5");
      }
    }
  }, [step]);
  useEffect(() => {
    const onBackPress = () => {
      if (currentStep > 0) {
        router.push(`/dashboard/packages?step=${currentStep - 1}`);
        return true; // Prevent default back action
      }

      return false;
      // Allow default back action
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress,
    );
    return () => backHandler.remove();
  }, [
    currentStep,
    router.replace,
    BackHandler,
    step,
    setCurrentStep,
    useLocalSearchParams,
  ]);
  useEffect(() => {
    AsyncStorage.getItem("currentStep").then((data) => {
      if (data) {
        console.log("Current Step from AsyncStorage:", data);
        const stepNumber = parseInt(data, 10);
        if (!isNaN(stepNumber) && stepNumber >= 0 && stepNumber <= 4) {
          setCurrentStep(stepNumber);
        }
      } else {
        // change this to 0 before pushing
        setCurrentStep(0); // Default to step 0 if no data found
      }
    });
  }, []);
  useEffect(() => {
    if (!senderAddress) {
      AsyncStorage.getItem("senderAddress").then((data) => {
        if (data) {
          setSenderAddress(JSON.parse(data));
        }
      });
    } else {
      AsyncStorage.setItem("senderAddress", JSON.stringify(senderAddress));
    }
    if (!receiverAddress) {
      AsyncStorage.getItem("receiverAddress").then((data) => {
        if (data) {
          setReceiverAddress(JSON.parse(data));
        }
      });
    } else {
      AsyncStorage.setItem("receiverAddress", JSON.stringify(receiverAddress));
    }
    if (localParcels.length === 0) {
      AsyncStorage.getItem("localParcels").then((value) => {
        if (value) {
          setLocalParcels(JSON.parse(value));
        }
      });
    } else {
      AsyncStorage.setItem("localParcels", JSON.stringify(localParcels));
    }
    if (!localPackaging) {
      AsyncStorage.getItem("localPackaging").then((value) => {
        if (value) {
          setLocalPackaging(JSON.parse(value));
        }
      });
    } else {
      AsyncStorage.setItem("localPackaging", JSON.stringify(localPackaging));
    }
  }, [senderAddress, receiverAddress, localParcels, localPackaging]);
  const handleBackPress = () => {
    router.back();
  };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="mt-4 mx-4">
            <View className="flex flex-row items-center justify-between">
              <Pressable
                onPress={handleBackPress}
                className="bg-white flex  h-10 w-10  rounded-full items-center justify-center "
              >
                <Ionicons name="chevron-back" size={24} />
              </Pressable>
              <Text className="text-xl font-medium">Send Package</Text>
              <Ionicons name="chevron-back" className="opacity-0" size={24} />
            </View>
            <View className="mt-4">
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
            </View>
            <View className="mt-4">
              <HorizontalLine />
            </View>
            {currentStep === 0 && (
              <Address
                type="sender"
                moveToNextStep={moveToNextStep}
                senderAddress={senderAddress}
                setSenderAddress={setSenderAddress}
              />
            )}
            {currentStep === 1 && (
              <Address
                type="receiver"
                moveToNextStep={moveToNextStep}
                receiverAddress={receiverAddress}
                setReceiverAddress={setReceiverAddress}
              />
            )}
            {currentStep === 2 && (
              <Parcel
                moveToNextStep={moveToNextStep}
                setLocalParcels={setLocalParcels}
                localParcels={localParcels}
              />
            )}
            {currentStep === 3 && (
              <Packaging
                moveToNextStep={moveToNextStep}
                localPackaging={localPackaging as PackagingType}
                setLocalPackaging={setLocalPackaging}
              />
            )}
            {currentStep === 4 && <Confirm moveToTheNextStep={moveToNextStep}/>}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
