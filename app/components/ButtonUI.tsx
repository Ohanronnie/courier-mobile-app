import { ReactNode } from "react";
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
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={className}
      style={style}
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
