"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-md border border-gold text-gold hover:bg-gold hover:text-white transition-colors duration-200"
    >
      {copied ? (
        <>
          <Check size={14} />
          <span>Tersalin!</span>
        </>
      ) : (
        <>
          <Copy size={14} />
          <span>Salin</span>
        </>
      )}
    </button>
  );
}
