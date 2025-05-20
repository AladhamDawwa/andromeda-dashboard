import type { Metadata } from "next";
import "./global.scss";
import "@andromeda/core/styles/themes.scss";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Providers } from "../../../../../providers";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "Noon Dine",
  description: "Dine-In application for the customer to order food from",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body>
        <Providers>
          <NextIntlClientProvider>
            <main>{children}</main>
            <div id="portal"></div>
          </NextIntlClientProvider>
          <ToastContainer autoClose={2000} />
        </Providers>
      </body>
    </html>
  );
}
