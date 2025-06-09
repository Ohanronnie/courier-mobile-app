import { Text, View } from "react-native";
import Button from "../../ButtonUI";
import Input from "../../Input";
export default function Address(){
  return (
    <View>
      
      <View className="">
          <View className="flex flex-row justify-between">
            <Input
              onChangeText={() => null}
              name=""
              placeholder="First Name"
              label="First Name"
              className="w-[48%] h-10"
            />
            <Input
              onChangeText={() => null}
              name=""
              placeholder="Last Name"
              label="Last Name"
              className="w-[48%]"
            />
          </View>
          <View>
            <Input
              onChangeText={() => null}
              name=""
              placeholder="Address Line 1"
              label="Address Line 1"
              className="w-full"
            />
            <Input
              onChangeText={() => null}
              name=""
              placeholder="Address Line 2 (Optional)"
              label="Address Line 2"
              className="w-full"
            />
            <View className="w-full flex flex-row justify-between">
              <Input
                onChangeText={() => null}
                name=""
                placeholder="Country"
                label="Country"
                className="w-[32%]"
              />
              <Input
                onChangeText={() => null}
                name=""
                placeholder="State"
                label="State"
                className="w-[32%]"
              />
              <Input
                onChangeText={() => null}
                name=""
                placeholder="City"
                label="City"
                className="w-[32%]"
              />
            </View>
            <Input
              onChangeText={() => null}
              name=""
              placeholder="Postal Code"
              label="Postal Code"
              className="w-full"
            />
          </View>
        </View>
        <Button onPress={() => null} className="h-16  mt-6 rounded-2xl p-0 bg-primary flex items-center justify-center">
          <Text className="text-white p-0">
            Save and Continue 
          </Text>
        </Button>
    </View>
  )
}