"use client";

import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

interface MusicPlayerProps {
  isOpen: boolean;
}

export interface MusicPlayerHandle {
  play: () => void;
}

const MusicPlayer = forwardRef<MusicPlayerHandle, MusicPlayerProps>(function MusicPlayer({ isOpen }, ref) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const audio = new Audio("/audio/background.mp3");
    audio.loop = true;
    audio.preload = "auto";
    audioRef.current = audio;
    return () => {
      audio.pause();
    };
  }, []);

  useImperativeHandle(ref, () => ({
    play: () => {
      audioRef.current?.play().catch(() => {
        setHasError(true);
      });
    },
  }));

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (hasError) {
      audioRef.current.play().catch(() => {});
      setHasError(false);
      return;
    }
    audioRef.current.muted = !audioRef.current.muted;
    setIsMuted((prev) => !prev);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="music-toggle"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ delay: 1, duration: 0.3 }}
          className={`fixed bottom-24 right-6 z-50${hasError ? " animate-pulse" : ""}`}
        >
          <button
            onClick={toggleMute}
            aria-label={hasError ? "Retry music" : isMuted ? "Unmute music" : "Mute music"}
            className="w-10 h-10 flex items-center justify-center rounded-full backdrop-blur-md bg-white/20 border border-white/30 text-[var(--color-fg)]"
          >
            {hasError || isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default MusicPlayer;
