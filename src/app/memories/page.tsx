"use client";

import { useState, useRef } from "react";

const submissions = [
  {
    id: 1,
    image: "https://cdn.midjourney.com/8c3c4317-9661-477f-843e-3379155392a3/0_3.png",
    title: "Garden, Late Afternoon",
    memory: "A garden in late afternoon light, the smell of earth after rain.",
    date: "Apr 20, 2026",
    index: "001",
  },
  {
    id: 7,
    image: "https://cdn.midjourney.com/5c09bef3-c39a-4a13-bdc5-17d771e45e14/0_0.png",
    title: "Untitled",
    memory: "",
    date: "Apr 20, 2026",
    index: "002",
  },
  {
    id: 2,
    image: "https://cdn.midjourney.com/874be3c0-a868-404a-83b9-fc098d6fd22d/0_0.png",
    title: "The Corridor",
    memory: "The corridor of my grandmother's house, wallpaper peeling at the edges.",
    date: "Apr 19, 2026",
    index: "003",
  },
  {
    id: 3,
    image: "https://cdn.midjourney.com/233bb763-a573-40c1-82ba-2f6df53c7121/0_0.png",
    title: "Frozen Lake",
    memory: "Standing at the edge of a frozen lake, nobody else around.",
    date: "Apr 18, 2026",
    index: "004",
  },
  {
    id: 4,
    image: "https://cdn.midjourney.com/96e2423a-1d72-4319-bcf2-6a23abbbc143/0_3.png",
    title: "Unknown Station",
    memory: "A train station in a city I never knew the name of.",
    date: "Apr 17, 2026",
    index: "005",
  },
  {
    id: 5,
    image: "https://cdn.midjourney.com/874be3c0-a868-404a-83b9-fc098d6fd22d/0_0.png",
    title: "Winter Chimney",
    memory: "Smoke rising from a chimney against a grey winter sky.",
    date: "Apr 16, 2026",
    index: "006",
  },
  {
    id: 6,
    image: "https://cdn.midjourney.com/233bb763-a573-40c1-82ba-2f6df53c7121/0_0.png",
    title: "Radio in Another Room",
    memory: "The sound of a radio playing in another room.",
    date: "Apr 15, 2026",
    index: "007",
  },
];

export default function GalleryPage() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    const el = trackRef.current;
    if (!el) return;
    isDragging.current = false;
    const startX = e.pageX - el.offsetLeft;
    const scrollLeft = el.scrollLeft;
    const onMove = (ev: MouseEvent) => {
      isDragging.current = true;
      const x = ev.pageX - el.offsetLeft;
      el.scrollLeft = scrollLeft - (x - startX);
    };
    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  return (
    <main className="h-screen bg-white flex flex-col overflow-hidden font-mono">
      {/* Header */}
      <header className="flex items-baseline justify-between px-8 pt-7 pb-5 shrink-0">
        <div className="flex items-baseline gap-4">
          <a href="/" className="text-[9px] tracking-[0.25em] uppercase text-[#a8b89a] hover:text-[#4a6a3a] transition-colors">
            ← The Botanist
          </a>
          <span className="text-[9px] text-[#d0d0d0]">|</span>
          <span className="text-[9px] tracking-[0.25em] uppercase text-[#2d3828]">Gallery</span>
        </div>
        <span className="text-[9px] tracking-widest uppercase text-[#c0c0c0]">
          {submissions.length} submissions
        </span>
      </header>

      {/* Scrollable track */}
      <div
        ref={trackRef}
        className="flex-1 flex items-center overflow-x-auto overflow-y-hidden cursor-grab active:cursor-grabbing select-none pb-8"
        style={{ scrollbarWidth: "none" }}
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-6 px-8">
          {submissions.map((s) => (
            <div
              key={s.id}
              className="shrink-0 flex flex-col gap-4 transition-opacity duration-300"
              style={{ opacity: hoveredId !== null && hoveredId !== s.id ? 0.3 : 1 }}
              onMouseEnter={() => setHoveredId(s.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Portrait frame */}
              <div
                className="relative overflow-hidden"
                style={{ width: "320px", height: "480px" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full h-full object-cover transition-all duration-700"
                  style={{
                    transform: hoveredId === s.id ? "scale(1.04)" : "scale(1)",
                    filter: hoveredId === s.id ? "grayscale(0%)" : "grayscale(20%)",
                  }}
                  draggable={false}
                />
                {/* Hover overlay */}
                <div
                  className="absolute inset-0 bg-white/80 flex items-end p-4 transition-opacity duration-300"
                  style={{ opacity: hoveredId === s.id ? 1 : 0 }}
                >
                  <p className="text-xs text-[#2d3828] leading-relaxed italic">
                    &ldquo;{s.memory}&rdquo;
                  </p>
                </div>
              </div>

              {/* Caption below */}
              <div className="flex items-baseline justify-between w-full px-0.5">
                <div>
                  <p className="text-[10px] tracking-[0.15em] uppercase text-[#2d3828]">
                    {s.title}
                  </p>
                  <p className="text-[9px] tracking-widest text-[#b0b0b0] mt-0.5">
                    {s.date}
                  </p>
                </div>
                <span className="text-[9px] text-[#d0d0d0]">{s.index}</span>
              </div>
            </div>
          ))}

          {/* End padding */}
          <div className="shrink-0 w-8" />
        </div>
      </div>
    </main>
  );
}
