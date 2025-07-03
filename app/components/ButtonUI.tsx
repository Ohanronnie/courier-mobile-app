import { ReactNode, useState } from "react";
import { View, Pressable, StyleSheet } from "react-native";
interface Props {
  children?: ReactNode;
  className?: string;
  style?: object;
  onPress: () => void;
  disabled?: boolean;
}

export default function Button({
  className,
  disabled,
  onPress,
  style,
  children,
}: Props) {
  const [isPressed, setIsPressed] = useState(false);
  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      disabled={disabled}
      className={className}
      style={[
        style,
        {
          opacity: disabled ? 0.5 : isPressed ? 0.7 : 1,
        },
      ]}
    >
      {children}
    </Pressable>
  );
}
const styles = StyleSheet.create({
  button: {
    width: "auto",
    height: "auto",
  },
});
