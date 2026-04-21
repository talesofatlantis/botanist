"use client";

import { useState } from "react";

const tabs = [
  {
    id: "medium",
    label: "The Medium",
    rows: [
      {
        label: "Premise",
        value:
          "This project is built around the intersection of different media types — text, computation, and image — none of which exist in isolation here.",
      },
      {
        label: "Input",
        value:
          "A memory, written as text. Language is the most intimate medium we have — imprecise, associative, deeply personal.",
      },
      {
        label: "Process",
        value:
          "That text is passed through a quantum circuit simulation — a computational medium that operates on probability and superposition rather than deterministic logic.",
      },
      {
        label: "Output",
        value:
          "The mutated result is rendered by a diffusion model as an image — a visual medium that has never seen the original memory, only its transformed version.",
      },
      {
        label: "Intention",
        value:
          "Each medium introduces its own distortion. The goal was to stack these distortions — to move a memory through language, through quantum noise, through machine vision — and see what survives.",
      },
    ],
  },
  {
    id: "concept",
    label: "The Concept",
    rows: [
      {
        label: "Core",
        value:
          "Memory is not a recording. Every time you remember something, you reconstruct it — slightly altered by mood, time, context. The Botanist makes that process computational.",
      },
      {
        label: "Transformation",
        value:
          "The quantum circuit doesn't destroy your memory — it does what memory already does. It shifts synonyms, introduces noise, collapses ambiguity into something specific. The output is what your memory might become after years of re-telling.",
      },
      {
        label: "Determinism",
        value:
          "The same input will always produce the same bitstring, and therefore the same mutation. This is intentional: your memory has one quantum signature. It doesn't drift randomly — it drifts precisely.",
      },
      {
        label: "The image",
        value:
          "The generated image is not an illustration of your memory. It is a rendering of its mutated form — something the algorithm dreamed from the collapsed version of what you described.",
      },
      {
        label: "Why",
        value:
          "To explore what it means to hand something personal to a machine and receive something uncanny back. Not a copy, not a translation — a transformation.",
      },
    ],
  },
  {
    id: "artists",
    label: "Refik Anadol",
    rows: [
      {
        label: "Refik Anadol",
        value:
          "Turkish-American media artist based in Los Angeles. His core idea: data has an aesthetic — it can be made to feel. He collects massive datasets, trains custom AI models, and visualises the results as fluid, living sculptures. He calls the AI his \"thinking brush\" and the data his \"pigment.\" His studio has processed over 4 billion images since 2016.",
      },
      {
        label: "Melting Memories",
        value:
          "Anadol's 2018 work made brainwave data visible. Subjects in EEG headsets focused on a childhood memory; the beta and theta frequencies were processed into morphing, cloud-like forms on an LED wall. Your memory, as rendered by a machine.",
      },
      {
        label: "Quantum Memories",
        value:
          "In 2020, Anadol fed Google's quantum computing research data and 200 million nature images into a GAN. The philosophical driver was the Many-Worlds Interpretation — every quantum event spawns a parallel universe. What does nature look like in a parallel world, as imagined by a machine that learned from ours?",
      },
      {
        label: "Claude Monet",
        value:
          "Monet's series paintings — haystacks, water lilies, Rouen Cathedral — weren't about capturing a subject but about capturing a moment of seeing, repeated and varied over time. The same scene in different light, across years. The Botanist borrows this: the same memory, same quantum signature, rendered differently each time the model runs.",
      },
      {
        label: "Matt Komo",
        value:
          "Filmmaker and visual artist known for cinematic, atmospheric work. His images have a painterly quality — light as a subject in itself. His visual language — the feeling of being somewhere just out of reach — is part of what the generated images aim for: familiar but displaced.",
      },
      {
        label: "A Forgotten Life",
        value:
          "The emotional undercurrent of this project. A forgotten life is not lost — it is transformed. The quantum mutation of your memory mirrors what forgetting already does: it doesn't erase, it distorts, softens, substitutes.",
      },
    ],
  },
  {
    id: "quantum",
    label: "IBM Qiskit",
    rows: [
      {
        label: "Superposition",
        value:
          "In classical computing, a bit is either 0 or 1. A qubit can be both simultaneously — a superposition of states. It only resolves to one value when measured. This is the core principle the circuit exploits.",
      },
      {
        label: "Hadamard gate",
        value:
          "The first operation applied to each qubit. It puts the qubit into an equal superposition of 0 and 1 — a coin spinning in the air, not yet heads or tails. This is the moment of maximum uncertainty.",
      },
      {
        label: "RY rotation",
        value:
          "Each qubit is then rotated by an angle derived from its corresponding character's ASCII value (θ = ASCII / 128 × π). This encodes your memory into the quantum state — each letter shifts the probability of measuring 0 or 1.",
      },
      {
        label: "Entanglement",
        value:
          "CX (controlled-NOT) gates link adjacent qubits together. Measuring one now affects the other — the qubits are entangled. This means the bitstring produced isn't just a list of independent values; the whole circuit collapses as a system.",
      },
      {
        label: "Measurement",
        value:
          "The circuit is measured once. Each qubit collapses to 0 or 1. The result is a bitstring — one bit per qubit, up to 16 bits for a 16-character input. This is the quantum signature of your memory.",
      },
      {
        label: "Word mutation",
        value:
          "Each bit maps to a word in your input. A 1 triggers a transformation — synonym or modifier — applied via a lookup map. A 0 leaves the word unchanged. The mutated sentence is the prompt sent to the image model.",
      },
      {
        label: "Many-Worlds",
        value:
          "The philosophical frame, borrowed from Anadol: the Many-Worlds Interpretation holds that every quantum measurement spawns a branching reality. The bitstring your memory produces is the branch it falls into — one possible world among many.",
      },
    ],
  },
  {
    id: "mwi",
    label: "Many-Worlds",
    rows: [
      {
        label: "The problem",
        value:
          "In quantum mechanics, particles exist in superposition — multiple states simultaneously. When you measure one, it collapses to a single definite value. The Copenhagen interpretation just says: that's what measurement does, don't ask why. Hugh Everett III, who proposed MWI in 1957, found that unsatisfying.",
      },
      {
        label: "Core idea",
        value:
          "Instead of the wavefunction collapsing, Everett argued it never collapses. Every time a quantum measurement occurs, the universe literally branches — every possible outcome happens, just in different branches of reality. Each branch is equally real. There is no collapse, only divergence.",
      },
      {
        label: "In practice",
        value:
          "When your quantum circuit measures a qubit and gets 0 — in another branch, it got 1. Both outcomes exist. Both worlds continue. You just happen to be in the one that got 0.",
      },
      {
        label: "Determinism",
        value:
          "There is no randomness in MWI — everything is deterministic. What looks like probability is just you not knowing which branch you're in. Every decision, every particle interaction, every radioactive decay is constantly spawning new branches — growing at every quantum event, everywhere in the universe, at all times.",
      },
      {
        label: "Controversy",
        value:
          "MWI is mathematically elegant — you don't need to add any special collapse rule. But it's philosophically extreme. It requires accepting that an almost incomprehensible number of parallel realities exist, none more real than any other. You can't interact with other branches. You can't prove they exist. Some physicists love it for its cleanliness; others find it extravagant.",
      },
      {
        label: "Relevance",
        value:
          "When The Botanist runs your memory through the circuit and produces a bitstring — that string represents one collapsed branch. The other possible bitstrings, the other possible mutations, the other possible images — they exist too, in MWI. You just landed in this one.",
      },
    ],
  },
];

export default function ProcessPage() {
  const [active, setActive] = useState("medium");
  const current = tabs.find((t) => t.id === active)!;

  return (
    <main className="min-h-screen bg-white dark:bg-[#0f0f0d] text-[#2d3828] dark:text-[#e8e8e6] flex flex-col font-mono">
      {/* Header */}
      <header className="flex items-baseline justify-between px-8 pt-7 pb-5 border-b border-[#ebebeb] dark:border-[#1e1e1c]">
        <div className="flex items-baseline gap-4">
          <a href="/" className="text-[9px] tracking-[0.25em] uppercase text-[#a8b89a] hover:text-[#4a6a3a] transition-colors">
            ← The Botanist
          </a>
          <span className="text-[9px] text-[#d0d0d0]">|</span>
          <span className="text-[9px] tracking-[0.25em] uppercase text-[#2d3828] dark:text-[#e8e8e6]">Process</span>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar tabs */}
        <aside className="shrink-0 w-40 border-r border-[#ebebeb] dark:border-[#1e1e1c] flex flex-col pt-8">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`text-left px-6 py-3 text-[9px] tracking-[0.2em] uppercase transition-colors border-b border-[#ebebeb] dark:border-[#1e1e1c] ${
                active === t.id
                  ? "text-[#2d3828] dark:text-[#e8e8e6] bg-[#f9f9f7] dark:bg-[#141412]"
                  : "text-[#a8b89a] dark:text-[#505050] hover:text-[#6b7a5e] dark:hover:text-[#909090]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </aside>

        {/* Content */}
        <div className="flex-1 px-8 py-8 max-w-2xl">
          <div className="flex flex-col border-t border-[#ebebeb] dark:border-[#1e1e1c]">
            {current.rows.map(({ label, value }) => (
              <div
                key={label}
                className="flex gap-6 px-0.5 py-4 border-b border-[#ebebeb] dark:border-[#1e1e1c]"
              >
                <span className="text-[8px] tracking-[0.2em] uppercase text-[#c0c8b8] dark:text-[#505050] shrink-0 pt-0.5 w-20">
                  {label}
                </span>
                <p className="text-[11px] text-[#6b7a5e] dark:text-[#909090] leading-relaxed">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
