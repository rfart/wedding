"use client";

import { Home, Users, Image, Gift, MessageCircleHeart } from "lucide-react";

const navItems = [
  { label: "Home", icon: Home, href: "#home" },
  { label: "Pasangan", icon: Users, href: "#pasangan" },
  { label: "Galeri", icon: Image, href: "#galeri" },
  { label: "Hadiah", icon: Gift, href: "#hadiah" },
  { label: "Ucapan", icon: MessageCircleHeart, href: "#ucapan" },
];

export default function BottomNav() {
  const handleNav = (href: string) => {
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-bg border-t border-border">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto px-2">
        {navItems.map(({ label, icon: Icon, href }) => (
          <button
            key={href}
            onClick={() => handleNav(href)}
            className="flex flex-col items-center gap-0.5 flex-1 py-1 text-fg-muted hover:text-accent transition-colors"
          >
            <Icon size={20} />
            <span className="text-[10px] leading-none">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
