"use client";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0f0f0d] text-[#2d3828] dark:text-[#e8e8e6] flex flex-col font-mono">
      {/* Header */}
      <header className="flex items-baseline justify-between px-8 pt-7 pb-5 border-b border-[#ebebeb] dark:border-[#1e1e1c]">
        <div className="flex items-baseline gap-4">
          <a href="/" className="text-[9px] tracking-[0.25em] uppercase text-[#a8b89a] hover:text-[#4a6a3a] transition-colors">
            ← The Botanist
          </a>
          <span className="text-[9px] text-[#d0d0d0]">|</span>
          <span className="text-[9px] tracking-[0.25em] uppercase text-[#2d3828] dark:text-[#e8e8e6]">About</span>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 px-8 py-12 max-w-xl">
        <div className="flex flex-col border-t border-[#ebebeb] dark:border-[#1e1e1c]">
          {[
            {
              label: "What",
              value:
                "The Botanist takes a text memory and processes it through a simulated quantum circuit before generating an image.",
            },
            {
              label: "How",
              value:
                "When you submit a memory, each character maps to a qubit. Those qubits are put into superposition with Hadamard gates, rotated with RY gates (angle derived from the character's ASCII value), and entangled with CX gates between adjacent qubits. The circuit is then measured, collapsing into a bitstring.",
            },
            {
              label: "Mutation",
              value:
                "That bitstring drives a word mutation pass — each word in your original memory is either replaced with a synonym, modified with an adjective, or left unchanged, based on the bit value at that position. The resulting mutated prompt is sent to a diffusion model, which renders it as an image.",
            },
            {
              label: "Result",
              value:
                "The output is deterministic to your input but unpredictable in feel — the same memory will always produce the same transformation, but the quantum interference makes the result feel foreign to the original.",
            },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="flex gap-6 px-0.5 py-4 border-b border-[#ebebeb] dark:border-[#1e1e1c]"
            >
              <span className="text-[8px] tracking-[0.2em] uppercase text-[#c0c8b8] dark:text-[#505050] shrink-0 pt-0.5 w-16">
                {label}
              </span>
              <p className="text-[11px] text-[#6b7a5e] dark:text-[#909090] leading-relaxed">
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
