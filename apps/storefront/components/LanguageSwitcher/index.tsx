"use client";

import { usePathname, useRouter } from "@/i18n/navigation";

import { useLocale } from "next-intl";
import { useTransition } from "react";

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();

  const otherLocale = locale === "en" ? "ar" : "en"; // Add more if needed

  const handleLocaleChange = () => {
    startTransition(() => {
      router.replace(pathname, { locale: otherLocale });
    });
  };

  return (
    <button
      style={{
        all: "unset",
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "bold",
        color: "black",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        border: "2px solid var(--border-color)",
        borderRadius: "50px",
        height: "30px",
        width: "30px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "3px",
      }}
      onClick={handleLocaleChange}
      disabled={isPending}
    >
      {otherLocale.toUpperCase()}
    </button>
  );
};

export default LanguageSwitcher;
