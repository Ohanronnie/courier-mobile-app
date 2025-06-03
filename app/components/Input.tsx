import { Text, View, TextInput } from "react-native";
import Icons from "@expo/vector-icons/MaterialIcons";
import IonIcons from "@expo/vector-icons/Ionicons";
import Button from "../components/ButtonUI";
import { ComponentProps } from "react";

type InputProps = {
  className?: string;
  placeholder: string;
  onChangeText: (text: string, value: string) => void;
  secureTextEntry?: boolean;
  iconName: ComponentProps<typeof IonIcons>["name"];
  name: string;
  keyboardType?: ComponentProps<typeof TextInput>["keyboardType"];
  error?: string;
  value?: string | undefined;
  viewClassName?: string;
};
export default function Input({
  className,
  placeholder,
  onChangeText,
  secureTextEntry = false,
  iconName,
  name,
  keyboardType,
  error,
  value,
  viewClassName,
}: InputProps) {
  return (
    <View className={`${className} `}>
      <View
        className={`${viewClassName} mt-6 p-2 bg-white  border-[0.5px] rounded-xl flex flex-row items-center`}
      >
        <IonIcons size={24} name={iconName} />
        <TextInput
          className="mx-2 h-full w-full "
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          value={value}
          onChangeText={(value: string) => onChangeText(value, name)}
        />
      </View>
      {error && (
        <Text className="text-red-500 text-sm capitalize mt-1 ml-2">
          {error}
        </Text>
      )}
    </View>
  );
}
