import { useEffect, useState } from "react";

export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry with the highest intersection ratio
        const visibleEntry = entries.reduce((max, entry) => {
          return entry.intersectionRatio > (max?.intersectionRatio || 0) ? entry : max;
        }, entries[0]);

        if (visibleEntry?.isIntersecting) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-80px 0px -50% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    );

    const elements: Element[] = [];
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        elements.push(element);
        observer.observe(element);
      }
    });

    return () => {
      elements.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, [sectionIds]);

  return activeSection;
}

