"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import Cover from "@/components/sections/Cover";
import BottomNav from "@/components/layout/BottomNav";
import Mukadimah from "@/components/sections/Mukadimah";
import ProfilMempelai from "@/components/sections/ProfilMempelai";
import DetailAcara from "@/components/sections/DetailAcara";
import LoveStory from "@/components/sections/LoveStory";
import Galeri from "@/components/sections/Galeri";
import WeddingGift from "@/components/sections/WeddingGift";
import RsvpWishes from "@/components/sections/RsvpWishes";
import Penutup from "@/components/sections/Penutup";
import MusicPlayer, { type MusicPlayerHandle } from "@/components/ui/MusicPlayer";

function toTitleCase(str: string) {
  return str.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function InvitationPage({ tamu }: { tamu: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const musicRef = useRef<MusicPlayerHandle>(null);
  const displayTamu = tamu ? toTitleCase(tamu) : "";

  const handleOpen = () => {
    musicRef.current?.play();
    setIsOpen(true);
  };

  useEffect(() => {
    // Always lock scroll when cover is present
    if (!isOpen) {
      document.body.classList.add("cover-open");
      return () => document.body.classList.remove("cover-open");
    }

    // isOpen = true: keep locked during the cover slide-up animation (850ms),
    // then unlock and hard-reset scroll to top so the page starts at section 1.
    document.body.classList.add("cover-open");
    const t = setTimeout(() => {
      document.body.classList.remove("cover-open");
      window.scrollTo({ top: 0, behavior: "instant" });
    }, 900);
    return () => {
      clearTimeout(t);
      document.body.classList.remove("cover-open");
    };
  }, [isOpen]);

  return (
    <>
      {/* Main content always rendered underneath so it's visible as cover slides away */}
      <main>
        <Mukadimah />
        <ProfilMempelai />
        <DetailAcara />
        <LoveStory />
        <Galeri />
        <WeddingGift />
        <RsvpWishes tamu={displayTamu} />
        <Penutup />
      </main>
      {isOpen && <BottomNav />}
      <MusicPlayer ref={musicRef} isOpen={isOpen} />

      <AnimatePresence>
        {!isOpen && <Cover key="cover" tamu={displayTamu} onOpen={handleOpen} />}
      </AnimatePresence>
    </>
  );
}
