"use client";

import { useState } from "react";

type Row = { label: string; value: string; images?: string[] };

type Tab = {
  id: string;
  label: string;
  parent?: string;
  rows: Row[];
};

type NavItem = {
  id: string;
  label: string;
  children?: { id: string; label: string }[];
};

const tabs: Tab[] = [
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
    id: "refik",
    label: "Refik Anadol",
    parent: "Artists",
    rows: [
      {
        label: "Who",
        value:
          "Refik Anadol is a Turkish-American media artist and director based in Los Angeles. His core idea is simple and radical: data has an aesthetic — it can be made to feel.",
      },
      {
        label: "Practice",
        value:
          "He collects massive datasets (archives, sounds, brainwaves, nature imagery), trains custom AI models on them, and visualises the results as fluid, living sculptures — projected onto buildings, displayed on giant LED walls, or installed in museums. He calls the AI his \"thinking brush\" and the data his \"pigment.\"",
      },
      {
        label: "Scale",
        value:
          "His studio of ~30 people has processed over 4 billion images and trained 300+ AI models since 2016. Think of him less as someone who uses AI as a tool, and more as someone who collaborates with it.",
      },
      {
        label: "Melting Memories",
        value:
          "Melting Memories (2018) is one of his most intimate works. He worked with neuroscientists at UCSF, putting subjects in EEG headsets and asking them to focus on a specific childhood memory. The resulting brainwave data — beta and theta frequencies — was processed mathematically and turned into morphing, cloud-like forms on a large LED wall. The piece made the invisible architecture of remembering visible. It's tender and strange: your memory, as rendered by a machine.",
        images: [
          "https://images.gitbook.com/__img/dpr=2,width=760,onerror=redirect,format=auto,signature=-661282770/https%3A%2F%2Ffiles.gitbook.com%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FPQzVPhuj5JRJEMmpZjYa%252Fuploads%252FASlMeiC2I5U5i6C4rl42%252FUI-Test-Video-2400x1350.jpg%3Falt%3Dmedia%26token%3D0dfbc37a-7cc3-4c7f-a464-2f6c53a9a0da",
          "https://images.gitbook.com/__img/dpr=2,width=760,onerror=redirect,format=auto,signature=-1911302450/https%3A%2F%2Ffiles.gitbook.com%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FPQzVPhuj5JRJEMmpZjYa%252Fuploads%252FsQjHvElUIjCo4vgn3Qyq%252FUI-Test-Video-2-2400x1350.jpg%3Falt%3Dmedia%26token%3Daadc12e7-4903-4efc-96ab-4616e6bf4548",
        ],
      },
      {
        label: "Quantum Memories",
        value:
          "Quantum Memories (2020) scaled things up dramatically. Anadol fed Google's quantum computing research data — combined with around 200 million nature images — into a GAN, producing swirling, iridescent, almost hallucinatory visuals. The idea was to ask: what does quantum reality look like? What does a machine dream when it processes something beyond human comprehension? It's more cosmic and overwhelming than Melting Memories — less about intimacy, more about awe.",
        images: [
          "https://images.gitbook.com/__img/dpr=2,width=760,onerror=redirect,format=auto,signature=-14332202/https%3A%2F%2Ffiles.gitbook.com%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FPQzVPhuj5JRJEMmpZjYa%252Fuploads%252FlaGQbNtJdbYAwHWapNJw%252F2338330_1_m.jpg%3Falt%3Dmedia%26token%3De01de6f4-f9d0-499b-9854-3f36b6e33146",
        ],
      },
      {
        label: "Dataset",
        value:
          "Over 200 million publicly available photographs of nature — clouds, water, Australian landscapes, and even images of Earth shot from the International Space Station. Anadol frames this as humanity's collective memory of nature — not one person's experience of a forest, but the sum of how billions of people have photographed and remembered the natural world.",
      },
      {
        label: "Cleaning",
        value:
          "Image analysis software stripped out any photo containing people or built structures, leaving only pure nature. This curation step is more artistic than it sounds — he's already making aesthetic and conceptual decisions about what \"nature\" means.",
      },
      {
        label: "Quantum layer",
        value:
          "Anadol worked directly with Google's Quantum AI research team, using their quantum computing software alongside a traditional supercomputer. The key ingredient was quantum noise — the random, irreducible fluctuations that occur at the subatomic level. In regular computing, randomness is simulated. In quantum computing, it's real, generated by the unpredictable behaviour of quantum particles. Anadol used this as a generative seed, creating what he called \"noise-generated datasets.\" This is what gives the visuals their particular quality of movement: not smooth, not predicted, but genuinely uncertain.",
      },
      {
        label: "Concept",
        value:
          "The Many-Worlds Interpretation of quantum mechanics — the idea that every quantum event spawns a parallel universe. Anadol was literally asking: what does nature look like in a parallel world, as imagined by a machine that has learned from ours?",
      },
      {
        label: "Installation",
        value:
          "Displayed on a 10×10 metre LED wall at the National Gallery of Victoria. The piece was also interactive — sensors tracked visitors' movements in real time, and their positions subtly influenced the generative output. The audience became entangled with the artwork, mirroring the quantum concept of the observer affecting the observed.",
      },
    ],
  },
  {
    id: "santiago",
    label: "Santiago Sares",
    parent: "Artists",
    rows: [
      {
        label: "Who",
        value:
          "Santiago Sares is a digital artist born in Buenos Aires in 1991. He operates at the intersection of human psychology and intelligent systems, with over a decade of international practice.",
      },
      {
        label: "Practice",
        value:
          "Sares develops immersive generative art through two primary frameworks: Quantum Consciousness and Generative Emotions. His methodology — \"Data Poetics\" — synthesizes artificial intelligence, biometric data, 3D environments, and generative art to transform abstract datasets into meaningful visual experiences.",
      },
      {
        label: "Themes",
        value:
          "His work investigates emotion, identity, and consciousness fragmentation — examining how technology reveals truths about human nature as systems reshape perception.",
      },
      {
        label: "Philosophy",
        value:
          "Sares views chaos as creatively generative, seeking order in disorder. He conceptualises AI work as intentional direction where \"intention imposes form on computation\" — positioning art as testimony against pure automation.",
      },
      {
        label: "Exhibitions",
        value:
          "Collaborated with Serpentine UK and Alias Studio on Inspicio, exploring inspiration through emotion detection and custom generative models. Participated in AIHokusai residency (Japan, 2024) and Primavera Digitale (Florence, 2025). Exhibited internationally across Italy, US, China, Canada, UK, Denmark, Argentina, Portugal, France, Estonia, and Spain — venues include Beeple Studios, SMTH, and Palacio Libertad, Buenos Aires.",
      },
    ],
  },
  {
    id: "mwi",
    label: "Many-Worlds",
    parent: "Theories",
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
];

// Build nav structure: group children under their parent label
const navItems: NavItem[] = [];
const seen = new Set<string>();
for (const t of tabs) {
  if (t.parent) {
    if (!seen.has(t.parent)) {
      seen.add(t.parent);
      navItems.push({ id: `__group_${t.parent}`, label: t.parent, children: [] });
    }
    navItems.find((n) => n.label === t.parent)!.children!.push({ id: t.id, label: t.label });
  } else {
    navItems.push({ id: t.id, label: t.label });
  }
}

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
        {/* Sidebar */}
        <aside className="shrink-0 w-40 border-r border-[#ebebeb] dark:border-[#1e1e1c] flex flex-col pt-8">
          {navItems.map((item) =>
            item.children ? (
              <div key={item.id}>
                {/* Parent label — not clickable */}
                <div className="px-6 py-3 text-[9px] tracking-[0.2em] uppercase text-[#c0c8b8] dark:text-[#404040] border-b border-[#ebebeb] dark:border-[#1e1e1c]">
                  {item.label}
                </div>
                {/* Children */}
                {item.children.map((child) => (
                  <button
                    key={child.id}
                    onClick={() => setActive(child.id)}
                    className={`w-full text-left pl-9 pr-4 py-2.5 text-[9px] tracking-[0.15em] uppercase transition-colors border-b border-[#ebebeb] dark:border-[#1e1e1c] ${
                      active === child.id
                        ? "text-[#2d3828] dark:text-[#e8e8e6] bg-[#f9f9f7] dark:bg-[#141412]"
                        : "text-[#a8b89a] dark:text-[#505050] hover:text-[#6b7a5e] dark:hover:text-[#909090]"
                    }`}
                  >
                    — {child.label}
                  </button>
                ))}
              </div>
            ) : (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                className={`text-left px-6 py-3 text-[9px] tracking-[0.2em] uppercase transition-colors border-b border-[#ebebeb] dark:border-[#1e1e1c] ${
                  active === item.id
                    ? "text-[#2d3828] dark:text-[#e8e8e6] bg-[#f9f9f7] dark:bg-[#141412]"
                    : "text-[#a8b89a] dark:text-[#505050] hover:text-[#6b7a5e] dark:hover:text-[#909090]"
                }`}
              >
                {item.label}
              </button>
            )
          )}
        </aside>

        {/* Content */}
        <div className="flex-1 px-8 py-8 max-w-2xl">
          <div className="flex flex-col border-t border-[#ebebeb] dark:border-[#1e1e1c]">
            {current.rows.map(({ label, value, images }) => (
              <div
                key={label}
                className="flex gap-6 px-0.5 py-4 border-b border-[#ebebeb] dark:border-[#1e1e1c]"
              >
                <span className="text-[8px] tracking-[0.2em] uppercase text-[#c0c8b8] dark:text-[#505050] shrink-0 pt-0.5 w-20">
                  {label}
                </span>
                <div className="flex flex-col gap-3 flex-1">
                  <p className="text-[11px] text-[#6b7a5e] dark:text-[#909090] leading-relaxed">
                    {value}
                  </p>
                  {images && (
                    <div className="flex flex-col gap-2">
                      {images.map((src, i) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img key={i} src={src} alt="" className="w-full object-cover" />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
