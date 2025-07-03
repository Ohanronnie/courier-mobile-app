import FontAwesome from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import Button from "../components/ButtonUI";
import Login from "./login";
import Register from "./register";
export default function Auth() {
  const { type } = useLocalSearchParams();
  const [screen, setScreen] = useState<string>();
  const router = useRouter();
  useEffect(() => {
    if (type === "login") {
      setScreen("login");
    } else if (type === "register") {
      setScreen("register");
    }
  }, [type]);
  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView>
          <View className="flex-1 pt-14  bg-[#0a0a0a]">
            <View className="mt-12  pl-8">
              <View className="w-14 p-0 flex justify-center items-center h-14 border  border-[white] rounded-full">
                <Button onPress={() => router.back()} className="p-0">
                  <FontAwesome name="arrow-back" size={24} color="white" />
                </Button>
              </View>
              <View className="mt-12">
                <View>
                  <Text className="text-white text-4xl ">
                    Go ahead and set up{" "}
                  </Text>
                  <Text className="text-white text-4xl ">your account</Text>
                </View>
                <Text className="text-gray-400 mt-6">
                  Sign up to get the best managing experience
                </Text>
              </View>
            </View>
            <View className="mt-8 bg-[#eef0f2] h-full flex-1 px-6 py-6 rounded-tl-[2rem] rounded-tr-[2rem] w-full">
              <View className="flex flex-row border--[0.5px]  justify-between h-16 rounded-[3rem] p-1 bg-[white] w-full">
                <View className="w-[49%]">
                  <Button
                    onPress={() => setScreen("login")}
                    className={`w-full rounded-[3rem] h-full flex  items-center justify-center p-0 m-0x ${screen === "login" && "bg-primary"}`}
                  >
                    <Text
                      className={`text-center font-medium text-lg  ${screen === "login" ? "text-white" : "text-lack"}`}
                    >
                      Login
                    </Text>
                  </Button>
                </View>
                <View className="w-[49%]">
                  <Button
                    onPress={() => setScreen("register")}
                    className={`w-full rounded-[3rem] h-full flex  items-center justify-center p-0 m-0x ${screen === "register" && "bg-primary text-white"}`}
                  >
                    <Text
                      className={`text-center font-medium text-lg  ${screen === "register" ? "text-white" : "text-lack"}`}
                    >
                      Register
                    </Text>
                  </Button>
                </View>
              </View>
              <View className="pb-12 h-full bg-[#eef0f2]">
                {screen === "login" ? <Login /> : <Register />}
              </View>

              {/*<View className="flex mx-4 mt-14 justify-between flex-row items-center">
                <View className="border-b flex-1 h-1 border-b-black"></View>
                <Text className="mx-2 ">Or</Text>
                <View className="border-b flex-1 h-1  border-b-black"></View>
              </View>
              <View>
                <View className="w-full mt-4 h-14">
                  <Button
                    onPress={() => alert(374)}
                    className="mt-4 flex flex-row justify-center text-white items-center bg-white border border-black h-16 rounded-[3rem]"
                  >
                    <FontAwesome size={24} name="logo-google" />
                    <Text className="ml-2 text-black">
                      Continue with Google
                    </Text>
                  </Button>
                </View>
              </View>*/}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}
