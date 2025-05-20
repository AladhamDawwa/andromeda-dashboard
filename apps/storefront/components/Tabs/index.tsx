import React, { useRef, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import styles from "./styles.module.scss";

export default function Tabs({
  tabs,
}: {
  tabs: { arName: string; enName: string; code: string }[];
}) {
  const { locale } = useParams();
  const [activeTab, setActiveTab] = useState(tabs[0].code);
  const tabRefs = useRef<(HTMLDivElement | undefined)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  const onTabChange = (code: string) => {
    const element = document.querySelector(`#${code}`);
    if (element) {
      const rect = element.getBoundingClientRect();
      const offsetTop = window.scrollY + rect.top - 227.5; // 15px below the actual top
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const index = tabs.findIndex((tab) => tab.code === activeTab);
    const currentTab = tabRefs.current[index];

    if (currentTab) {
      const rect = currentTab.getBoundingClientRect();
      const containerRect = currentTab.parentElement?.getBoundingClientRect();
      if (!containerRect) return;

      setIndicatorStyle({
        left: rect.left - containerRect.left,
        width: rect.width,
      });
    }
  }, [activeTab, tabs]);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateShadows = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el;

      if (el.parentElement) {
        el.style.setProperty("--shadow-left", scrollLeft > 0 ? "1" : "0");
        el.style.setProperty(
          "--shadow-right",
          scrollLeft + clientWidth < scrollWidth ? "1" : "0"
        );
      }
    };

    updateShadows(); // initial call
    el.addEventListener("scroll", updateShadows);
    window.addEventListener("resize", updateShadows);

    return () => {
      el.removeEventListener("scroll", updateShadows);
      window.removeEventListener("resize", updateShadows);
    };
  }, []);

  useEffect(() => {
    function handleScroll() {
      const tabsRefs = tabs.map(
        (tab) => document.querySelector(`#${tab.code}`) as HTMLDivElement
      );
      const sectionPositions = tabsRefs
        .map((ref) => {
          if (!ref) return null;
          const rect = ref.getBoundingClientRect();
          return {
            id: ref.id,
            top: rect.top,
            height: rect.height,
            bottom: rect.bottom,
          };
        })
        .filter(Boolean);

      const visibleSection = sectionPositions.find(
        (pos) =>
          pos !== null &&
          pos.bottom > window.innerHeight * 0.5 &&
          pos.top < window.innerHeight * 0.5
      );

      if (visibleSection) {
        setActiveTab(visibleSection.id ?? tabs[0].code);
      } else {
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [tabs]);

  return (
    <div ref={containerRef} className={styles.tabsContainer}>
      <div className={styles.tabs}>
        {tabs.map((tab, index) => (
          <div
            key={tab.code}
            ref={(el) => {
              tabRefs.current[index] = el || undefined;
            }}
            className={`${styles.tab} ${
              activeTab === tab.code ? styles.active : ""
            }`}
            onClick={() => onTabChange(tab.code)}
          >
            {locale === "ar" ? tab.arName : tab.enName}
          </div>
        ))}
        <div
          className={styles.indicator}
          style={{
            left: `${indicatorStyle.left}px`,
            width: `${indicatorStyle.width}px`,
          }}
        />
      </div>
    </div>
  );
}
