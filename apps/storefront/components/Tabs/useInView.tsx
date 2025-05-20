import { useEffect, useState } from "react";

export function useScrollSpy(ids: string[], offset = 0) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      let currentId: string | null = null;

      for (let i = 0; i < ids.length; i++) {
        const el = document.getElementById(ids[i]);
        if (el) {
          const rect = el.getBoundingClientRect();

          // Check if element is in view (at least partially)
          const inView = rect.top <= offset && rect.bottom > offset;

          if (inView) {
            currentId = ids[i];
            break;
          }

          // If it's the last section, mark it active when near bottom
          if (
            i === ids.length - 1 &&
            window.innerHeight + window.scrollY >=
              document.body.offsetHeight - 5
          ) {
            currentId = ids[i];
          }
        }
      }

      setActiveId(currentId);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [ids, offset]);

  return activeId;
}
