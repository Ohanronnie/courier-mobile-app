import { Text, View, TextInput } from "react-native";
import Icons from "@expo/vector-icons/MaterialIcons";
import IonIcons from "@expo/vector-icons/Ionicons";
import Button from "../components/ButtonUI";
import { ComponentProps, ReactNode } from "react";

type InputProps = {
  className?: string;
  placeholder?: string;
  onChangeText?: (text: string, name: string, ...args: any[]) => void;
  secureTextEntry?: boolean;
  iconName?: ComponentProps<typeof IonIcons>["name"];
  name?: string;
  keyboardType?: ComponentProps<typeof TextInput>["keyboardType"];
  error?: string;
  value?: string | undefined;
  extendComponent?: ReactNode;
  viewClassName?: string;
  label?: string;
  multiline?: boolean;
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
  extendComponent,
  label,
  multiline,
}: InputProps) {
  return (
    <View className={`${className} mt-6`}>
      {label && (
        <Text className="mb-2 text-subtext-light dark:text-subtext-dark">
          {label}
        </Text>
      )}
      <View
        className={`p-1 border-input-light dark:border-input-dark bg-surface-light dark:bg-surface-dark  ${
          !viewClassName ? "border-[1px]" : viewClassName
        } rounded-xl flex flex-row items-center`}
      >
        <IonIcons size={24} name={iconName} />

        <TextInput
          className="mx-2 h-full w-full text-subtext-light dark:text-subtext-dark placeholder:text-subtext-light placeholder:dark:text-subtext-dark"
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          multiline={multiline}
          textAlignVertical={multiline ? "top" : "center"}
          value={value}
          onChangeText={(value: string) =>
            onChangeText && name && onChangeText(value, name)
          }
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
