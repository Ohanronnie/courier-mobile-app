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
    <View className="flex flex-row items-center justify-between w-full">
      {steps.map((step, index) => (
        <View key={index} className="flex items-center flex-1">
          {/* Step Circle */}
          <View
            className={`w-6 h-6 rounded-full flex items-center justify-center ${
              index <= currentStep ? "bg-primary" : "bg-gray-300"
            }`}
          >
            <Text
              className={`${index <= currentStep ? "text-white" : "text-gray-500"} font-bold`}
            >
              {index + 1}
            </Text>
          </View>

          {/* Step Label */}
          <Text
            className={`text-center text-sm mt-2 ${
              index <= currentStep ? "text-primary" : "text-gray-500"
            }`}
          >
            {step}
          </Text>

          {/* Connector Line */}
          {index < steps.length - 1 && (
            <View
              className={`h-1 w-full ${
                index < currentStep ? "bg-primary" : "bg-gray-300"
              }`}
              style={{
                position: "absolute",
                top: 10,
                left: "50%",
                right: "-50%",
                zIndex: -1,
              }}
            />
          )}
        </View>
      ))}
    </View>
  );
};

export default StepsIndicator;
