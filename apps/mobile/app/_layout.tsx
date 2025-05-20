import ContextWrapper from "@/context";
import i18n, { initI18n } from "@/i18n/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { I18nextProvider } from "react-i18next";
import React, { useEffect, useState } from "react";
import { View, Text, I18nManager } from "react-native";
export default function RootLayout() {
  const queryClient = new QueryClient();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initI18n().then(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <ContextWrapper>
          <Slot />
          <StatusBar style="auto" />
        </ContextWrapper>
      </I18nextProvider>
    </QueryClientProvider>
  );
}
