import React from "react";
import { View, Text } from "react-native";

interface StepsIndicatorProps {
  steps: string[]; // Array of step labels
  currentStep: number; // Index of the current step (0-based)
}

const StepsIndicator: React.FC<StepsIndicatorProps> = ({
  steps,
  currentStep,
}) => {
  return (
    <View className="relative flex flex-row items-center justify-between w-full">
      {steps.map((step, index) => (
        <View key={index} className="flex items-center flex-1">
          {/* Step Circle */}
          <View
            className={`w-6 h-6 rounded-full elevation flex items-center justify-center ${
              index <= currentStep ? "bg-primary" : "bg-gray-300"
            }`}
          >
            <Text
              className={`${
                index <= currentStep ? "text-white" : "text-gray-500"
              } font-bold`}
            >
              {index + 1}
            </Text>
          </View>

          {/* Step Label */}
          <Text
            className={`text-center elevation text-sm mt-2 ${
              index <= currentStep ? "text-primary" : "text-gray-500"
            }`}
            numberOfLines={1} // Prevents text from wrapping
            ellipsizeMode="tail" // Adds ellipsis if text is too long
          >
            {step}
          </Text>

          {/* Connector Line */}
          {index < steps.length - 1 && (
            <View
              className={`absolute z-0 top-0 h-1 ${
                index < currentStep ? "bg-primary" : "bg-gray-300"
              }`}
              style={{
                width: "100%", // Ensures the line spans the full width
                left: "65%", // Start from the middle of the current step
                transform: [{ translateY: 10 }], // Adjust to align with the next step
              }}
            />
          )}
        </View>
      ))}
    </View>
  );
};

export default StepsIndicator;
