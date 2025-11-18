import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface EmailInputProps {
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  "aria-invalid"?: boolean | "true" | "false";
  "aria-describedby"?: string;
}

const COMMON_DOMAINS = [
  "gmail.com",
  "outlook.com",
  "yahoo.com",
  "hotmail.com",
  "icloud.com",
  "protonmail.com",
];

export function EmailInput({ value, onChange, onBlur, disabled, placeholder, className, ...ariaProps }: EmailInputProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const atIndex = value.lastIndexOf("@");
    
    if (atIndex !== -1 && atIndex === value.length - 1) {
      // User just typed @, show all suggestions
      const username = value.slice(0, atIndex);
      setSuggestions(COMMON_DOMAINS.map(domain => `${username}@${domain}`));
      setShowSuggestions(true);
      setSelectedIndex(0);
    } else if (atIndex !== -1 && atIndex < value.length - 1) {
      // User is typing after @
      const username = value.slice(0, atIndex);
      const domain = value.slice(atIndex + 1).toLowerCase();
      
      if (domain.length > 0) {
        const filtered = COMMON_DOMAINS
          .filter(d => d.startsWith(domain))
          .map(d => `${username}@${d}`);
        
        if (filtered.length > 0) {
          setSuggestions(filtered);
          setShowSuggestions(true);
          setSelectedIndex(0);
        } else {
          setShowSuggestions(false);
        }
      } else {
        setSuggestions(COMMON_DOMAINS.map(domain => `${username}@${domain}`));
        setShowSuggestions(true);
        setSelectedIndex(0);
      }
    } else {
      setShowSuggestions(false);
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === "Enter" || e.key === "Tab") {
      if (showSuggestions) {
        e.preventDefault();
        onChange(suggestions[selectedIndex]);
        setShowSuggestions(false);
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  return (
    <div className="relative">
      <Input
        ref={inputRef}
        type="email"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={() => {
          setTimeout(() => {
            setShowSuggestions(false);
            onBlur();
          }, 200);
        }}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        autoComplete="off"
        className={className}
        {...ariaProps}
      />
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 mt-1 w-full rounded-md border border-slate-700 bg-slate-900 shadow-lg">
          <ul className="max-h-60 overflow-auto py-1">
            {suggestions.map((suggestion, index) => (
              <li
                key={suggestion}
                className={cn(
                  "cursor-pointer px-3 py-2 text-sm transition-colors",
                  index === selectedIndex
                    ? "bg-emerald-400/10 text-emerald-300"
                    : "text-slate-300 hover:bg-slate-800"
                )}
                onClick={() => handleSuggestionClick(suggestion)}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
