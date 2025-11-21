import { useEffect } from "react";
import { toast } from "@/hooks/use-toast";

interface NavigationSection {
  key: string;
  sectionId: string;
  name: string;
}

export function useKeyboardNavigation(sections: NavigationSection[]) {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Home key - scroll to top
      if (e.key === "Home") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        toast({
          title: "Navigated to top",
          duration: 1500,
        });
        return;
      }

      // End key - scroll to bottom
      if (e.key === "End") {
        e.preventDefault();
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
        toast({
          title: "Navigated to bottom",
          duration: 1500,
        });
        return;
      }

      // Number keys (1-9) - navigate to sections
      const keyNum = parseInt(e.key);
      if (!isNaN(keyNum) && keyNum >= 1 && keyNum <= sections.length) {
        e.preventDefault();
        const section = sections[keyNum - 1];
        const element = document.getElementById(section.sectionId);
        
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          toast({
            title: `Navigated to ${section.name}`,
            duration: 1500,
          });
        }
      }

      // Show help with '?' key
      if (e.key === "?" && e.shiftKey) {
        e.preventDefault();
        const shortcuts = [
          "Home - Scroll to top",
          "End - Scroll to bottom",
          ...sections.map((s, i) => `${i + 1} - ${s.name}`),
        ];
        
        toast({
          title: "Keyboard Shortcuts",
          description: (
            <div className="mt-2 space-y-1 text-xs">
              {shortcuts.map((shortcut, i) => (
                <div key={i} className="font-mono">{shortcut}</div>
              ))}
            </div>
          ),
          duration: 5000,
        });
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [sections]);
}
