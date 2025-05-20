import React, { useEffect, useState } from "react";
import { TouchableOpacity, Image, View } from "react-native";
import { Stack, Redirect } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useUserContext } from "@/context/user";
import { I18nManager } from "react-native";
import { Text } from "react-native";
import { Platform } from "react-native";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNRestart from "react-native-restart"; // Import package from node modules

export default function TabLayout() {
  const { handleLogout, isAuthenticated } = useUserContext();
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  const toggleLanguage = async () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    const isRTL = newLang === "ar";

    i18n.changeLanguage(newLang);
    setLanguage(newLang);
    I18nManager.forceRTL(isRTL);
    await AsyncStorage.setItem("language", newLang);
    if (Platform.OS !== "web") {
      RNRestart.Restart();
    }
  };
  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "",
          headerLeft: () => (
            <Image
              source={require("../../assets/Dine-oon.png")}
              style={{ width: 100, height: 40 }}
              resizeMode="contain"
            />
          ),
          headerRight: () => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                marginRight: 10,
              }}
            >
              <TouchableOpacity onPress={toggleLanguage}>
                <Text style={{ fontSize: 16, color: "blue" }}>
                  {language === "en" ? "AR" : "EN"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleLogout}>
                <MaterialIcons name="logout" size={20} color="red" />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
    </Stack>
  );
}
