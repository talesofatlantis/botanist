"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

type Phase = "idle" | "quantum" | "rendering" | "done";

export default function Home() {
  const [memory, setMemory] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async () => {
    if (!memory.trim()) return;
    setSubmitted(true);
    setPhase("quantum");

    await new Promise((r) => setTimeout(r, 1800));
    setPhase("rendering");

    await new Promise((r) => setTimeout(r, 2200));
    setPhase("done");
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
    quantum: "Passing through quantum noise",
    rendering: "Summoning the image",
    done: "Memory rendered",
  };

  return (
    <main className="relative min-h-screen bg-[#0a0d07] text-[#d4dcc8] flex flex-col overflow-hidden">
      {/* Noise texture */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
        }}
      />
      {/* Vignette */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#0a0d07_100%)]" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-8 pt-8 pb-4">
        <div className="flex flex-col gap-0.5">
          <span className="text-xs tracking-[0.25em] uppercase text-[#6b7a5e] font-mono">
            The Botanist
          </span>
          <span className="text-[10px] tracking-widest uppercase text-[#3d4a33] font-mono">
            Memory Interface v0.1
          </span>
        </div>
        {phase !== "idle" && (
          <Badge
            variant="outline"
            className="font-mono text-[10px] tracking-widest uppercase border-[#2e3a26] text-[#6b7a5e] bg-transparent animate-pulse"
          >
            {phaseLabel[phase]}
          </Badge>
        )}
      </header>

      {/* Canvas */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6">
        {phase === "idle" && (
          <div className="text-center space-y-3 mb-16 select-none">
            <h1 className="text-4xl font-light tracking-tight text-[#c8d4bc]">
              Plant a memory.
            </h1>
            <p className="text-sm text-[#4a5a3d] max-w-xs mx-auto leading-relaxed font-mono">
              Describe what you see, feel, or remember.
              <br />
              The Botanist will let it grow.
            </p>
          </div>
        )}

        {phase === "quantum" && <QuantumNoise />}

        {(phase === "rendering" || phase === "done") && (
          <div className="w-full max-w-2xl aspect-video bg-[#0d1209] border border-[#1e2a18] rounded-lg flex items-center justify-center mb-8 overflow-hidden">
            {phase === "rendering" ? (
              <RenderingPlaceholder />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#1a2e14] via-[#0d1a0a] to-[#0a1008] flex items-center justify-center">
                <span className="text-[#3d5a33] font-mono text-xs tracking-widest">
                  IMAGE PLACEHOLDER
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Prompt bar */}
      <div className="relative z-10 px-6 pb-8 max-w-2xl w-full mx-auto">
        {phase === "done" ? (
          <div className="flex flex-col items-center gap-4">
            <p className="text-xs text-[#4a5a3d] font-mono tracking-wide italic">
              &ldquo;{memory}&rdquo;
            </p>
            <Button
              variant="outline"
              onClick={handleReset}
              className="border-[#2e3a26] text-[#6b7a5e] bg-transparent hover:bg-[#1a2314] hover:text-[#a0b090] font-mono text-xs tracking-widest uppercase"
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
              className="resize-none bg-[#0d1209] border-[#1e2a18] text-[#c8d4bc] placeholder:text-[#2e3a26] focus-visible:ring-[#3d5a33] focus-visible:border-[#3d5a33] font-mono text-sm rounded-lg transition-all"
            />
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-[#2e3a26] font-mono tracking-widest">
                ⌘ + ENTER TO SUBMIT
              </span>
              <Button
                onClick={handleSubmit}
                disabled={!memory.trim() || submitted}
                variant="outline"
                className="bg-[#1e2e18] hover:bg-[#2a3d22] text-[#a0b090] border border-[#2e3a26] font-mono text-xs tracking-widest uppercase disabled:opacity-30 transition-all"
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
        const v = Math.random() * 60 + 10;
        data[i] = v * 0.4;
        data[i + 1] = v * 0.6;
        data[i + 2] = v * 0.3;
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
      <p className="text-[10px] font-mono text-[#3d4a33] tracking-[0.3em] uppercase animate-pulse">
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
            className="w-1 bg-[#3d5a33] rounded-full animate-pulse"
            style={{ height: `${h}px`, animationDelay: `${i * 150}ms` }}
          />
        ))}
      </div>
      <span className="text-[10px] font-mono text-[#3d4a33] tracking-[0.3em] uppercase">
        Rendering
      </span>
    </div>
  );
}
