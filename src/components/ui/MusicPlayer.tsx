"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

interface MusicPlayerProps {
  isOpen: boolean;
}

export default function MusicPlayer({ isOpen }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = new Audio("/audio/background.mp3");
    audio.loop = true;
    audio.preload = "auto";
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  useEffect(() => {
    if (!isOpen || !audioRef.current) return;
    const audio = audioRef.current;
    const timer = setTimeout(() => {
      audio.play().catch(() => {});
    }, 200);
    return () => clearTimeout(timer);
  }, [isOpen]);

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !audioRef.current.muted;
    setIsMuted((prev) => !prev);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.button
          key="music-toggle"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ delay: 1, duration: 0.3 }}
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute music" : "Mute music"}
          className="fixed bottom-24 right-6 z-50 w-10 h-10 rounded-full flex items-center justify-center bg-[var(--color-surface)] border border-[var(--color-accent)] text-[var(--color-fg)] shadow-md"
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </motion.button>
      )}
    </AnimatePresence>
  );
}
