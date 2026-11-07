"use client";

import { useState, useEffect } from "react";
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

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      document.body.classList.add("cover-open");
    } else {
      document.body.classList.remove("cover-open");
    }
    return () => {
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
        <RsvpWishes />
        <Penutup />
      </main>
      {isOpen && <BottomNav />}

      <AnimatePresence>
        {!isOpen && <Cover key="cover" onOpen={() => setIsOpen(true)} />}
      </AnimatePresence>
    </>
  );
}
