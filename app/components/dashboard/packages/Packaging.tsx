import { View, Text, Alert } from "react-native";
import Input from "../../Input";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import Button from "../../ButtonUI";
import { validatePackaging } from "@/app/lib/validators/packaging";
export type PackagingType = {
  name: string;
  height: string;
  width: string;
  weight: string;
  length: string;
  wrapper: "box" | "soft-packaging" | "envelope";
};
export default function Packaging({
  moveToNextStep,
  setLocalPackaging,
  localPackaging,
}: {
  moveToNextStep: () => void;
  setLocalPackaging: (val: PackagingType) => void;
  localPackaging: PackagingType;
}) {
  const [packaging, setPackaging] = useState<PackagingType | null>({
    wrapper: "box",
    name: "",
    height: "",
    width: "",
    weight: "",
    length: "",
  });
  const [errors, setErrors] = useState<PackagingType | null>(null);
  const handleChange = (value: string, field: string) => {
    setPackaging((prev) => ({ ...prev, [field]: value }) as PackagingType);
  };
  const handleSubmit = () => {
    const _errors = validatePackaging(packaging);
    console.log(_errors);
    setErrors(_errors as PackagingType);
    if (!_errors) {
      setLocalPackaging(packaging as PackagingType);
      moveToNextStep();
    }
  };
  useEffect(() => {
    if (localPackaging) {
      setPackaging(localPackaging);
    }
  }, [localPackaging]);
  return (
    <View>
      <View>
        <Input
          label="Package Name"
          placeholder="Name"
          className="w-full"
          name="name"
          onChangeText={handleChange}
          error={errors?.name}
          value={packaging?.name}
        />
      </View>
      <View className="mt-6 mb-1">
        <Text className="mb-2">Package Unit</Text>
        <View className="border border-gray-300 rounded-md">
          <Picker aria-disabled={true}>
            <Picker.Item label="Centimetres (CM)" value="CM" />
          </Picker>
        </View>
      </View>
      <View className="flex flex-row justify-between">
        <Input
          label="Package Height"
          placeholder="Height"
          className="w-[32%]"
          name="height"
          keyboardType="numeric"
          value={packaging?.height}
          onChangeText={handleChange}
          error={errors?.height}
        />
        <Input
          label="Package Width"
          placeholder="Width"
          name="width"
          keyboardType="numeric"
          className="w-[32%]"
          value={packaging?.width}
          onChangeText={handleChange}
          error={errors?.width}
        />
        <Input
          label="Package Length"
          placeholder="Length"
          className="w-[32%]"
          name="length"
          keyboardType="numeric"
          value={packaging?.length}
          onChangeText={handleChange}
          error={errors?.length}
        />
      </View>
      <Input
        label="Package Weight (KG)"
        placeholder="Weight"
        name="weight"
        className="w-full mt-2"
        keyboardType="numeric"
        value={packaging?.weight}
        onChangeText={handleChange}
        error={errors?.weight}
      />
      <View className="mt-6 mb-1">
        <Text className="mb-2">Wrapper Type</Text>
        <View className="border border-gray-300 rounded-md">
          <Picker
            selectedValue={packaging?.wrapper || "box"}
            onValueChange={(itemValue) => handleChange(itemValue, "wrapper")}
          >
            <Picker.Item label="Box" value="box" />
            <Picker.Item label="Envelope" value="envelope" />
            <Picker.Item label="Soft Packaging" value="soft-packaging" />
          </Picker>
        </View>
      </View>

      <Button
        onPress={handleSubmit}
        className="h-16 mt-6 rounded-full p-0 bg-primary flex items-center justify-center"
      >
        <Text className="text-white p-0">Save and Continue</Text>
      </Button>
    </View>
  );
}
