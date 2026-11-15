"use client";

import { useEffect, useRef } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface DoveAnimationProps {
  isOpen: boolean;
}

export default function DoveAnimation({ isOpen }: DoveAnimationProps) {
  const doveRef = useRef<HTMLDivElement>(null);

  // Cover phase: sit at center-left
  useEffect(() => {
    if (!isOpen && doveRef.current) {
      gsap.set(doveRef.current, { x: 12, y: window.innerHeight / 2 - 50, scaleX: -1 });
    }
  }, [isOpen]);

  // Scroll phase: checkpoint-based movement
  useEffect(() => {
    if (!isOpen || !doveRef.current) return;

    let cleanup: (() => void) | null = null;

    // Wait for cover slide-up + scroll unlock (900 ms)
    const timer = setTimeout(() => {
      if (!doveRef.current) return;
      ScrollTrigger.refresh();

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const el = doveRef.current;

      const rand = (min: number, max: number) => Math.random() * (max - min) + min;
      const eases = ["power1.inOut", "power2.inOut", "power3.inOut", "sine.inOut", "circ.inOut"];
      const randomEase = () => eases[Math.floor(Math.random() * eases.length)];

      // Start at top-left
      gsap.set(el, { x: 12, y: vh / 2 - 50, scaleX: -1 });

      // Target only the actual section wrappers (every other child — FlowerDividers sit between them)
      const sections = Array.from(document.querySelectorAll("main > *:nth-child(odd)"));

      // Four corners, cycled across sections so each real section gets its own corner
      const corners = [
        { x: rand(8, 20),             y: rand(2, 8) },                  // top-left
        { x: rand(vw - 110, vw - 84), y: rand(2, 8) },                  // top-right
        { x: rand(8, 20),             y: rand(vh * 0.72, vh * 0.8) },   // bottom-left
        { x: rand(vw - 110, vw - 84), y: rand(vh * 0.72, vh * 0.8) },   // bottom-right
      ];

      const waypoints = sections.map((_, i) => {
        const isLast = i === sections.length - 1;
        let x: number, y: number;
        if (isLast) {
          x = (vw - 100) / 2;
          y = rand(2, 8);
        } else {
          const corner = corners[i % corners.length];
          x = corner.x;
          y = corner.y;
        }
        return { x, y, scaleX: x < vw / 2 ? -1 : 1, ease: randomEase() };
      });

      // Active tween reference — killed whenever a new checkpoint fires
      let activeTween: gsap.core.Tween | null = null;

      const flyTo = (wp: (typeof waypoints)[0]) => {
        activeTween?.kill();
        activeTween = gsap.to(el, {
          x: wp.x,
          y: wp.y,
          scaleX: wp.scaleX,
          duration: 1.5,
          ease: wp.ease,
        });
      };

      const triggers = sections.map((section, i) =>
        ScrollTrigger.create({
          trigger: section,
          // Fire when the section's top crosses 65 % from the viewport top
          start: "top 65%",
          onEnter: () => flyTo(waypoints[i]),
          onEnterBack: () => flyTo(waypoints[i]),
        })
      );

      cleanup = () => {
        activeTween?.kill();
        triggers.forEach((t) => t.kill());
      };
    }, 1000);

    return () => {
      clearTimeout(timer);
      cleanup?.();
    };
  }, [isOpen]);

  return (
    <div
      ref={doveRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 100,
        height: 100,
        pointerEvents: "none",
        zIndex: 60,
        filter: "invert(1)",
      }}
    >
      <DotLottieReact
        src="/dove_black.lottie"
        loop
        autoplay
        style={{ width: 100, height: 100 }}
      />
    </div>
  );
}
