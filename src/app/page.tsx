"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

type Phase = "idle" | "quantum" | "done" | "error";

interface WordTrace {
  original: string;
  output: string;
  bit: string;
  angle: number;
  operation: "skip" | "synonym" | "modifier" | "unchanged";
  qubit: number;
}

export default function Home() {
  const [memory, setMemory] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [mutatedPrompt, setMutatedPrompt] = useState("");
  const [bitstring, setBitstring] = useState("");
  const [trace, setTrace] = useState<WordTrace[]>([]);
  const [errorMsg, setErrorMsg] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Both the API call and the step animation must finish before we go to "done"
  const apiDataRef = useRef<{ mutated: string; bitstring: string; trace: WordTrace[] } | null>(null);
  const stepsCompleteRef = useRef(false);

  const checkBothDone = () => {
    if (stepsCompleteRef.current && apiDataRef.current) {
      const d = apiDataRef.current;
      setMutatedPrompt(d.mutated);
      setBitstring(d.bitstring);
      setTrace(d.trace);
      setPhase("done");
    }
  };

  const handleStepsComplete = () => {
    stepsCompleteRef.current = true;
    checkBothDone();
  };

  const handleSubmit = async () => {
    if (!memory.trim()) return;
    setSubmitted(true);
    setPhase("quantum");
    setErrorMsg("");
    apiDataRef.current = null;
    stepsCompleteRef.current = false;

    try {
      const res = await fetch("/api/transform", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: memory }),
      });

      if (!res.ok) throw new Error("Transform failed");

      const data = await res.json();
      apiDataRef.current = { mutated: data.mutated, bitstring: data.bitstring, trace: data.trace ?? [] };
      checkBothDone();
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
    setTrace([]);
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
                  { label: "Process", href: "/process" },
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
            <h1
              style={{
                fontFamily: "'Mona Sans', sans-serif",
                fontWeight: 300,
                fontStretch: "125%",
                fontSize: "clamp(38px, 7vw, 68px)",
                letterSpacing: "-0.02em",
                lineHeight: 1,
                color: "#1a1f17",
              }}
            >
              The Botanist
            </h1>
            <p className="text-sm text-[#7a8c6e] max-w-sm mx-auto leading-relaxed font-mono">
              An algorithm that reshapes your memory by passing it through
              a quantum circuit where decoherence and measurement collapse
              the outcome.
            </p>
          </div>
        )}

        {phase === "quantum" && <QuantumSteps prompt={memory} onComplete={handleStepsComplete} />}
      </div>

      {/* Prompt bar */}
      <div className="relative z-10 px-6 pb-8 max-w-2xl w-full mx-auto">
        {phase === "error" && (
          <div className="flex flex-col items-center gap-3 mb-4">
            <p className="text-xs text-red-400 font-mono">{errorMsg}</p>
          </div>
        )}

        {phase === "done" ? (
          <div className="flex flex-col items-center gap-6 w-full max-w-2xl">
            {/* Prompts */}
            <div className="w-full space-y-2 text-center">
              <p className="text-[10px] text-[#b0b8a8] font-mono tracking-widest uppercase">Original</p>
              <p className="text-xs text-[#7a8c6e] font-mono italic">&ldquo;{memory}&rdquo;</p>
              <p className="text-[10px] text-[#b0b8a8] font-mono tracking-widest uppercase mt-3">Quantum collapse</p>
              <p className="text-xs text-[#2d3828] font-mono italic">&ldquo;{mutatedPrompt}&rdquo;</p>
            </div>

            {/* Circuit trace */}
            {trace.length > 0 && (
              <div className="w-full border border-[#e8e8e8]">
                {/* Header */}
                <div className="grid grid-cols-[2fr_2fr_1fr_1fr_2fr] gap-0 border-b border-[#e8e8e8] bg-[#f9f9f7]">
                  {["word", "output", "qubit", "bit / θ", "operation"].map((h) => (
                    <div key={h} className="px-3 py-2 text-[8px] font-mono tracking-[0.2em] uppercase text-[#b0b8a8]">
                      {h}
                    </div>
                  ))}
                </div>
                {/* Rows */}
                {trace.filter(t => t.operation !== "skip").map((t, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-[2fr_2fr_1fr_1fr_2fr] gap-0 border-b border-[#f0f0ee] last:border-0"
                  >
                    <div className="px-3 py-2 text-[10px] font-mono text-[#7a8c6e]">{t.original}</div>
                    <div className={`px-3 py-2 text-[10px] font-mono ${t.operation === "unchanged" ? "text-[#b0b8a8]" : "text-[#2d3828]"}`}>
                      {t.output}
                    </div>
                    <div className="px-3 py-2 text-[10px] font-mono text-[#b0b8a8]">q{t.qubit}</div>
                    <div className="px-3 py-2 text-[10px] font-mono text-[#b0b8a8]">
                      {t.bit} / {t.angle.toFixed(2)}
                    </div>
                    <div className="px-3 py-2">
                      <OperationBadge op={t.operation} />
                    </div>
                  </div>
                ))}
                {/* Bitstring footer */}
                <div className="px-3 py-2 bg-[#f9f9f7] border-t border-[#e8e8e8]">
                  <span className="text-[8px] font-mono text-[#c8d4b4] tracking-widest break-all">{bitstring}</span>
                </div>
              </div>
            )}

            <Button
              variant="outline"
              onClick={handleReset}
              className="border-[#c4d4b4] text-[#6b7a5e] bg-transparent hover:bg-[#e8f0dc] hover:text-[#4a5e3a] font-mono text-xs tracking-widest uppercase"
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

const OP_STYLES: Record<string, string> = {
  synonym:   "text-[#4a7a3a] bg-[#eaf3e0] border-[#c4d4b4]",
  modifier:  "text-[#5a6a8a] bg-[#eaf0f8] border-[#c0ccdd]",
  unchanged: "text-[#b0b8a8] bg-transparent border-[#e0e0e0]",
};

function OperationBadge({ op }: { op: string }) {
  const cls = OP_STYLES[op] ?? OP_STYLES.unchanged;
  return (
    <span className={`inline-block border px-1.5 py-0.5 text-[8px] font-mono tracking-widest uppercase ${cls}`}>
      {op}
    </span>
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

function QuantumSteps({ prompt, onComplete }: { prompt: string; onComplete: () => void }) {
  const nonSpace = prompt.replace(/\s/g, "");
  const n = Math.min(Math.max(nonSpace.length, 4), 16);
  const wordCount = prompt.trim().split(/\s+/).filter(Boolean).length;

  const steps = [
    { label: "Initialise circuit",  detail: `${n} qubits · ${wordCount} words` },
    { label: "Hadamard gates",      detail: "Place all qubits in superposition" },
    { label: "RY rotations",        detail: "θ = ord(char) / 128 × π per qubit" },
    { label: "CX entanglement",     detail: "Link adjacent qubits" },
    { label: "Measure",             detail: "Collapse wavefunction → bitstring" },
    { label: "Word mutation",       detail: "Synonym / modifier map applied" },
  ];

  const [active, setActive] = useState(0);

  useEffect(() => {
    setActive(0);
    let i = 0;
    const tick = () => {
      i += 1;
      if (i < steps.length) {
        setActive(i);
        const isLast = i === steps.length - 1;
        const delay = isLast ? 2200 : 2000 + Math.random() * 400;
        timer = setTimeout(() => {
          if (isLast) onComplete();
          else tick();
        }, delay);
      }
    };
    let timer = setTimeout(tick, 1000);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col mb-16 w-full max-w-sm">
      {steps.map((s, i) => {
        const done    = i < active;
        const current = i === active;
        const pending = i > active;
        return (
          <div
            key={i}
            className="flex items-center justify-between gap-4 px-4 py-3 border-b border-[#f0f0ee] transition-opacity duration-300"
            style={{ opacity: pending ? 0.25 : 1 }}
          >
            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className={`text-[10px] font-mono tracking-[0.18em] uppercase leading-none transition-colors duration-300 ${
                current ? "text-[#2d3828]" : done ? "text-[#6b8a5e]" : "text-[#b8b8b8]"
              }`}>
                {s.label}
              </p>
              <p
                className="text-[9px] font-mono text-[#b0b8a8] mt-1.5 leading-relaxed transition-opacity duration-500"
                style={{ opacity: done || current ? 1 : 0 }}
              >
                {s.detail}
              </p>
            </div>

            {/* Right indicator — fixed width so nothing shifts */}
            <div className="shrink-0 flex items-center justify-end" style={{ width: 24 }}>
              {done ? (
                <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 text-[#8aaa6e]" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="2,8 6,12 14,4" />
                </svg>
              ) : current ? (
                <svg className="w-3.5 h-3.5 text-[#8aaa6e] animate-spin" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeOpacity="0.2" />
                  <path d="M8 2a6 6 0 0 1 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}

