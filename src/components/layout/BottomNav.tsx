"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Home, Users, Image, Gift, MessageCircleHeart } from "lucide-react";

const navItems = [
  { label: "Home", icon: Home, href: "#home", id: "home" },
  { label: "Pasangan", icon: Users, href: "#pasangan", id: "pasangan" },
  { label: "Galeri", icon: Image, href: "#galeri", id: "galeri" },
  { label: "Hadiah", icon: Gift, href: "#hadiah", id: "hadiah" },
  { label: "Ucapan", icon: MessageCircleHeart, href: "#ucapan", id: "ucapan" },
];

export default function BottomNav() {
  const [activeId, setActiveId] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      let current = navItems[0].id;

      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            current = item.id;
          }
        }
      }
      setActiveId(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (href: string) => {
    const id = href.replace("#", "");
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-bg/95 backdrop-blur-md border-t border-border/80 pb-safe">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto px-3">
        {navItems.map(({ label, icon: Icon, href, id }) => {
          const isActive = activeId === id;
          return (
            <button
              key={href}
              onClick={() => handleNav(href)}
              className="relative flex flex-col items-center justify-center gap-1 flex-1 py-1.5 transition-colors focus:outline-none"
            >
              {isActive && (
                <motion.span
                  layoutId="activeNavIndicator"
                  className="absolute -top-0.5 w-6 h-[2px] rounded-full bg-accent"
                  transition={{ type: "spring", stiffness: 380, damping: 28 }}
                />
              )}
              {isActive && (
                <motion.div
                  layoutId="activeNavBg"
                  className="absolute inset-x-1 inset-y-1 bg-accent/10 rounded-xl -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 28 }}
                />
              )}
              <Icon
                size={19}
                className={`transition-colors duration-200 ${
                  isActive ? "text-accent scale-105" : "text-fg-muted"
                }`}
              />
              <span
                className={`text-[10px] leading-none transition-colors duration-200 ${
                  isActive ? "text-fg font-medium" : "text-fg-muted"
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
