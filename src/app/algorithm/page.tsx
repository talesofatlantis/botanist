"use client";

const steps = [
  {
    id: "01",
    label: "Input",
    sublabel: "Memory text",
    detail: "The user submits a free-text memory. This is the raw input — unprocessed, personal, linguistic.",
    tech: "Browser → Next.js",
  },
  {
    id: "02",
    label: "Encode",
    sublabel: "Char → angle",
    detail: "Each character in the input is mapped to a rotation angle: θ = ASCII(char) / 128 × π. This encodes the semantic content of your text into quantum geometry.",
    tech: "ord(c) / 128 × π",
  },
  {
    id: "03",
    label: "H Gate",
    sublabel: "Superposition",
    detail: "A Hadamard gate is applied to each qubit, placing it in an equal superposition of |0⟩ and |1⟩. This is the moment of maximum uncertainty — the qubit is neither 0 nor 1.",
    tech: "Hadamard · H|0⟩ = |+⟩",
  },
  {
    id: "04",
    label: "RY Gate",
    sublabel: "Rotation",
    detail: "Each qubit is rotated around the Y-axis by its encoded angle. This biases the superposition — shifting the probability of measuring 0 or 1 based on the character it represents.",
    tech: "RY(θ) per qubit",
  },
  {
    id: "05",
    label: "CX Gate",
    sublabel: "Entanglement",
    detail: "Controlled-NOT gates link adjacent qubits together. The state of one qubit now depends on its neighbour. The circuit collapses as a system, not as isolated bits.",
    tech: "CX(q[i], q[i+1])",
  },
  {
    id: "06",
    label: "Measure",
    sublabel: "Collapse",
    detail: "The wavefunction is measured once. Each qubit collapses to 0 or 1. This is the quantum branch — one outcome drawn from all possibilities, determined by the interference pattern of your input.",
    tech: "1 shot · Qiskit Aer",
  },
  {
    id: "07",
    label: "Bitstring",
    sublabel: "Signature",
    detail: "The measurement produces a bitstring — one bit per qubit, up to 16 bits. This is the quantum signature of your memory. The same input always produces the same bitstring.",
    tech: "e.g. 1011001101010110",
  },
  {
    id: "08",
    label: "Mutate",
    sublabel: "Word map",
    detail: "Each bit maps to a word in the original input. A 1 triggers a transformation — synonym replacement or modifier injection — via a lookup table. A 0 leaves the word unchanged.",
    tech: "Synonym / modifier gates",
  },
  {
    id: "09",
    label: "Output",
    sublabel: "Image render",
    detail: "The mutated prompt is sent to a diffusion model. The model has never seen your original memory — only its quantum-collapsed form. The image is what that branch looks like.",
    tech: "Replicate · nano-banana-2",
  },
];

export default function ArchitecturePage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0f0f0d] text-[#2d3828] dark:text-[#e8e8e6] flex flex-col font-mono">
      {/* Header */}
      <header className="flex items-baseline justify-between px-8 pt-7 pb-5 border-b border-[#ebebeb] dark:border-[#1e1e1c]">
        <div className="flex items-baseline gap-4">
          <a href="/" className="text-[9px] tracking-[0.25em] uppercase text-[#a8b89a] hover:text-[#4a6a3a] transition-colors">
            ← The Botanist
          </a>
          <span className="text-[9px] text-[#d0d0d0]">|</span>
          <span className="text-[9px] tracking-[0.25em] uppercase text-[#2d3828] dark:text-[#e8e8e6]">Algorithm</span>
        </div>
      </header>

      {/* Pipeline */}
      <div className="px-8 pt-10 pb-6 overflow-x-auto">
        <div className="flex items-start min-w-max gap-0">
          {steps.map((step, i) => (
            <div key={step.id} className="flex items-start">
              {/* Node */}
              <div className="flex flex-col items-center" style={{ width: 100 }}>
                {/* Box */}
                <div className="w-full border border-[#ebebeb] dark:border-[#2a2a28] bg-[#fafafa] dark:bg-[#141412] px-3 py-3 flex flex-col gap-1">
                  <span className="text-[8px] text-[#c0c8b8] dark:text-[#505050] tracking-[0.2em]">{step.id}</span>
                  <span className="text-[10px] text-[#2d3828] dark:text-[#e8e8e6] tracking-[0.1em] uppercase">{step.label}</span>
                  <span className="text-[8px] text-[#a8b89a] dark:text-[#606060] leading-tight">{step.sublabel}</span>
                </div>
              </div>

              {/* Arrow */}
              {i < steps.length - 1 && (
                <div className="flex items-center self-stretch mt-6">
                  <div className="h-px w-5 bg-[#d8d8d6] dark:bg-[#2a2a28]" />
                  <div
                    className="w-0 h-0"
                    style={{
                      borderTop: "3px solid transparent",
                      borderBottom: "3px solid transparent",
                      borderLeft: "4px solid #d8d8d6",
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Detail rows */}
      <div className="px-8 pb-12 flex flex-col border-t border-[#ebebeb] dark:border-[#1e1e1c] mt-2">
        {steps.map((step) => (
          <div
            key={step.id}
            className="flex gap-6 px-0.5 py-4 border-b border-[#ebebeb] dark:border-[#1e1e1c]"
          >
            {/* Step ID + label */}
            <div className="shrink-0 w-28 flex flex-col gap-0.5 pt-0.5">
              <span className="text-[8px] text-[#c0c8b8] dark:text-[#505050] tracking-[0.2em]">{step.id}</span>
              <span className="text-[9px] tracking-[0.15em] uppercase text-[#2d3828] dark:text-[#e8e8e6]">{step.label}</span>
            </div>
            {/* Description */}
            <p className="text-[11px] text-[#6b7a5e] dark:text-[#909090] leading-relaxed flex-1">
              {step.detail}
            </p>
            {/* Tech note */}
            <span className="shrink-0 text-[8px] text-[#c0c8b8] dark:text-[#404040] tracking-[0.1em] pt-0.5 text-right" style={{ width: 140 }}>
              {step.tech}
            </span>
          </div>
        ))}
      </div>
    </main>
  );
}
