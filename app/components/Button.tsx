import { Pressable, View, Text, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/Ionicons";
import { type ComponentProps } from "react";
interface Props {
  label?: string;
  theme?: "primary";
  className?: string;
  style?: object;
  onPress?: () => void;
  icon?: ComponentProps<typeof FontAwesome>["name"];
  iconSize?: number;
}

export default function Button({
  label,
  iconSize,
  style,
  icon,
  theme,
  className,
  onPress,
}: Props) {
  return (
    <>
      <Pressable
        style={[styles.button, style]}
        className={className}
        onPress={onPress}
      >
        <FontAwesome
          style={styles.buttonIcon}
          name={icon}
          size={iconSize}
          color="#fff"
        />
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonLabel: {
    fontSize: 16,
    color: "#fff",
  },
  buttonIcon: {
    textAlign: "center",
  },
});
