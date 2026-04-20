"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

type Phase = "idle" | "quantum" | "rendering" | "done" | "error";

export default function Home() {
  const [memory, setMemory] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [mutatedPrompt, setMutatedPrompt] = useState("");
  const [bitstring, setBitstring] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async () => {
    if (!memory.trim()) return;
    setSubmitted(true);
    setPhase("quantum");
    setErrorMsg("");

    try {
      const res = await fetch("/api/transform", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: memory }),
      });

      if (!res.ok) throw new Error("Transform failed");

      const data = await res.json();
      setMutatedPrompt(data.mutated);
      setBitstring(data.bitstring);

      setPhase("rendering");
      // Midjourney call goes here — for now we resolve after a beat
      await new Promise((r) => setTimeout(r, 1200));
      setPhase("done");
    } catch (err) {
      console.error(err);
      setErrorMsg("The circuit failed to collapse. Try again.");
      setPhase("error");
      setSubmitted(false);
    }
  };

  const handleReset = () => {
    setMemory("");
    setSubmitted(false);
    setPhase("idle");
    setTimeout(() => textareaRef.current?.focus(), 100);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const phaseLabel: Record<Phase, string | null> = {
    idle: null,
    quantum: "Passing through quantum circuit",
    rendering: "Summoning the image",
    done: "Memory rendered",
    error: "Collapse failed",
  };

  return (
    <main className="relative min-h-screen bg-white text-[#2d3828] flex flex-col overflow-hidden">
      {/* Flickering grain */}
      <GrainOverlay />
      {/* Vignette */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,#f0f0f0_100%)]" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-8 pt-8 pb-4">
        <div className="flex flex-col gap-0.5">
          <span className="text-xs tracking-[0.25em] uppercase text-[#6b7a5e] font-mono">
            The Botanist
          </span>
          <span className="text-[10px] tracking-widest uppercase text-[#a8b89a] font-mono">
            Memory Interface v0.1
          </span>
        </div>
        <div className="flex items-center gap-4">
          {phase !== "idle" && (
            <Badge
              variant="outline"
              className="font-mono text-[10px] tracking-widest uppercase border-[#c4d4b4] text-[#6b7a5e] bg-transparent animate-pulse"
            >
              {phaseLabel[phase]}
            </Badge>
          )}
          <Sheet>
            <SheetTrigger className="flex flex-col gap-1.5 p-1 group outline-none" aria-label="Menu">
              <span className="block w-5 h-px bg-[#a8b89a] transition-colors group-hover:bg-[#4a5e3a]" />
              <span className="block w-5 h-px bg-[#a8b89a] transition-colors group-hover:bg-[#4a5e3a]" />
              <span className="block w-5 h-px bg-[#a8b89a] transition-colors group-hover:bg-[#4a5e3a]" />
            </SheetTrigger>
            <SheetContent side="right" className="bg-white border-l border-[#e8e8e8] w-72">
              <nav className="mt-12 flex flex-col gap-1">
                {[
                  { label: "About", href: "/" },
                  { label: "The Algorithm", href: "/architecture" },
                  { label: "Gallery", href: "/gallery" },
                  { label: "Contact", href: "/" },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="px-4 py-3 text-sm font-mono tracking-widest uppercase text-[#7a8c6e] hover:text-[#2d3828] hover:bg-[#f5f5f5] transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Canvas */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6">
        {phase === "idle" && (
          <div className="text-center space-y-3 mb-16 select-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://cdn.midjourney.com/5c09bef3-c39a-4a13-bdc5-17d771e45e14/0_0.png"
              alt="The Botanist"
              className="w-56 h-72 object-cover mx-auto mb-6 opacity-90 ring-1 ring-[#c8d4b4]"
            />
            <h1 className="text-4xl font-light tracking-tight text-[#2d3828]">
              The Botanist
            </h1>
            <p className="text-sm text-[#7a8c6e] max-w-sm mx-auto leading-relaxed font-mono">
              An algorithm that reshapes your memory by passing it through
              a quantum circuit where decoherence and measurement collapse
              the outcome.
            </p>
          </div>
        )}

        {phase === "quantum" && <QuantumNoise />}

        {(phase === "rendering" || phase === "done") && (
          <div className="w-full max-w-2xl aspect-video bg-[#f7f7f7] border border-[#e0e0e0] flex items-center justify-center mb-8 overflow-hidden">
            {phase === "rendering" ? (
              <RenderingPlaceholder />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#dce8d0] via-[#e8edd8] to-[#f0ece0] flex items-center justify-center">
                <span className="text-[#a8b89a] font-mono text-xs tracking-widest">
                  IMAGE PLACEHOLDER
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Prompt bar */}
      <div className="relative z-10 px-6 pb-8 max-w-2xl w-full mx-auto">
        {phase === "error" && (
          <div className="flex flex-col items-center gap-3 mb-4">
            <p className="text-xs text-red-400 font-mono">{errorMsg}</p>
          </div>
        )}

        {phase === "done" ? (
          <div className="flex flex-col items-center gap-4">
            <div className="w-full space-y-2 text-center">
              <p className="text-[10px] text-[#b0b8a8] font-mono tracking-widest uppercase">Original</p>
              <p className="text-xs text-[#7a8c6e] font-mono italic">&ldquo;{memory}&rdquo;</p>
              <p className="text-[10px] text-[#b0b8a8] font-mono tracking-widest uppercase mt-3">Quantum collapse</p>
              <p className="text-xs text-[#2d3828] font-mono italic">&ldquo;{mutatedPrompt}&rdquo;</p>
              <p className="text-[9px] text-[#c8d4b4] font-mono tracking-widest mt-2 break-all">{bitstring}</p>
            </div>
            <Button
              variant="outline"
              onClick={handleReset}
              className="border-[#c4d4b4] text-[#6b7a5e] bg-transparent hover:bg-[#e8f0dc] hover:text-[#4a5e3a] font-mono text-xs tracking-widest uppercase mt-2"
            >
              Plant another
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <Textarea
              ref={textareaRef}
              value={memory}
              onChange={(e) => setMemory(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={submitted}
              placeholder="Describe a memory, a scene, a feeling..."
              rows={3}
              autoFocus
              className="resize-none bg-white border-[#e0e0e0] text-[#2d3828] placeholder:text-[#c8c8c8] focus-visible:ring-[#8aaa6e] focus-visible:border-[#8aaa6e] font-mono text-sm rounded-none transition-all"
            />
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-[#b8b0a4] font-mono tracking-widest">
                ⌘ + ENTER TO SUBMIT
              </span>
              <Button
                onClick={handleSubmit}
                disabled={!memory.trim() || submitted}
                variant="outline"
                className="bg-[#e8f0dc] hover:bg-[#dceacc] text-[#4a5e3a] border border-[#c4d4b4] font-mono text-xs tracking-widest uppercase disabled:opacity-30 transition-all"
              >
                Submit memory
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

function GrainOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const { width, height } = canvas;
      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 255;
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = Math.random() * 18;
      }
      ctx.putImageData(imageData, 0, 0);
      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-10"
      style={{ mixBlendMode: "multiply" }}
    />
  );
}

function QuantumNoise() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;

    const draw = () => {
      const { width, height } = canvas;
      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 60 + 160;
        data[i] = v * 0.85;
        data[i + 1] = v * 0.9;
        data[i + 2] = v * 0.75;
        data[i + 3] = 255;
      }

      ctx.putImageData(imageData, 0, 0);
      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 mb-16">
      <canvas
        ref={canvasRef}
        width={320}
        height={180}
        className="rounded-lg opacity-80"
        style={{ imageRendering: "pixelated" }}
      />
      <p className="text-[10px] font-mono text-[#a8b89a] tracking-[0.3em] uppercase animate-pulse">
        Quantum noise applied
      </p>
    </div>
  );
}

function RenderingPlaceholder() {
  const heights = [24, 36, 28, 40, 20];
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex gap-1.5 items-end">
        {heights.map((h, i) => (
          <div
            key={i}
            className="w-1 bg-[#8aaa6e] rounded-full animate-pulse"
            style={{ height: `${h}px`, animationDelay: `${i * 150}ms` }}
          />
        ))}
      </div>
      <span className="text-[10px] font-mono text-[#a8b89a] tracking-[0.3em] uppercase">
        Rendering
      </span>
    </div>
  );
}
