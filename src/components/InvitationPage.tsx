"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import Cover from "@/components/sections/Cover";
import BottomNav from "@/components/layout/BottomNav";
import MusicPlayer, { type MusicPlayerHandle } from "@/components/ui/MusicPlayer";
import FadeContent from "@/components/ui/FadeContent";
import FlowerDivider from "@/components/ui/FlowerDivider";

const DoveAnimation = dynamic(() => import("@/components/ui/DoveAnimation"), { ssr: false });
const Mukadimah = dynamic(() => import("@/components/sections/Mukadimah"));
const ProfilMempelai = dynamic(() => import("@/components/sections/ProfilMempelai"));
const DetailAcara = dynamic(() => import("@/components/sections/DetailAcara"));
const LoveStory = dynamic(() => import("@/components/sections/LoveStory"));
const Galeri = dynamic(() => import("@/components/sections/Galeri"));
const WeddingGift = dynamic(() => import("@/components/sections/WeddingGift"));
const RsvpWishes = dynamic(() => import("@/components/sections/RsvpWishes"));
const Penutup = dynamic(() => import("@/components/sections/Penutup"));

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
        <FadeContent effect="mist" duration={2.5} threshold={0.12} ease="power2.out">
          <Mukadimah />
        </FadeContent>
        <FlowerDivider />
        <FadeContent effect="mist" duration={2.5} threshold={0.12} ease="power2.out">
          <ProfilMempelai />
        </FadeContent>
        <FlowerDivider />
        <FadeContent effect="mist" duration={2.5} threshold={0.12} ease="power2.out">
          <DetailAcara />
        </FadeContent>
        <FlowerDivider />
        <FadeContent effect="mist" duration={2.5} threshold={0.12} ease="power2.out">
          <LoveStory />
        </FadeContent>
        <FlowerDivider />
        <FadeContent effect="mist" duration={2.5} threshold={0.12} ease="power2.out">
          <Galeri />
        </FadeContent>
        <FlowerDivider />
        <FadeContent effect="mist" duration={2.5} threshold={0.12} ease="power2.out">
          <WeddingGift />
        </FadeContent>
        <FlowerDivider />
        <FadeContent effect="mist" duration={2.5} threshold={0.12} ease="power2.out">
          <RsvpWishes tamu={displayTamu} />
        </FadeContent>
        <FlowerDivider />
        <FadeContent effect="mist" duration={2.5} threshold={0.12} ease="power2.out">
          <Penutup />
        </FadeContent>
      </main>
      {isOpen && <BottomNav />}
      <MusicPlayer ref={musicRef} isOpen={isOpen} />

      <AnimatePresence>
        {!isOpen && <Cover key="cover" tamu={displayTamu} onOpen={handleOpen} />}
      </AnimatePresence>
      <DoveAnimation isOpen={isOpen} />
    </>
  );
}
