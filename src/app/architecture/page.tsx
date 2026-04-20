export default function ArchitecturePage() {
  return (
    <main className="min-h-screen bg-white font-mono text-[#2d3828] px-10 py-12">
      <p className="text-[10px] tracking-[0.25em] uppercase text-[#a8b89a] mb-10">
        The Botanist — System Architecture
      </p>

      <div className="flex flex-col gap-0">

        {/* Row 1: User */}
        <Row>
          <Node label="USER" sub="Browser" color="stone" />
        </Row>

        <Arrow label="types memory prompt" />

        {/* Row 2: Frontend */}
        <Row>
          <Node label="NEXT.JS" sub="Vercel · always on" color="sage" />
        </Row>

        <Arrow label="POST /api/transform  { prompt }" />

        {/* Row 3: Qiskit service */}
        <Row>
          <Node label="FASTAPI" sub="Railway · always on" color="sage" wide>
            <Step n="1" text="Encode prompt chars → rotation angles (0 – 2π)" />
            <Step n="2" text="Build 8-qubit circuit  H + RY gates" />
            <Step n="3" text="Apply IBM Brisbane noise model (cached at startup)" />
            <Step n="4" text="Run 1 shot → measurement collapse → bitstring" />
            <Step n="5" text="Use bitstring to mutate prompt  (synonym swap, inject descriptors)" />
          </Node>
        </Row>

        <Arrow label='returns  { mutated_prompt: "…" }' />

        {/* Row 4: Agent */}
        <Row>
          <Node label="CLAUDE AGENT" sub="Anthropic Agent SDK · Railway" color="amber" wide>
            <Step n="1" text="Receives mutated prompt from FastAPI" />
            <Step n="2" text="Spins up Playwright browser session (headless Chromium)" />
            <Step n="3" text="Navigates to midjourney.com · logs in via stored session cookie" />
            <Step n="4" text="Submits prompt via /imagine in the web UI" />
            <Step n="5" text="Polls for job completion · scrapes final image URL" />
            <Step n="6" text="Returns image URL + job metadata" />
          </Node>
        </Row>

        <Arrow label="returns image URL" />

        {/* Row 5: Back to frontend */}
        <Row>
          <Node label="NEXT.JS" sub="renders image in UI" color="sage" />
        </Row>

        {/* Side notes */}
        <div className="mt-10 border-t border-[#e8e8e8] pt-6 flex gap-8">
          <SideNote
            label="WHY AN AGENT"
            sub="vs discord bot"
            note="No bot token needed. No API approval. The agent uses the same web UI a human would — resilient to Midjourney API changes."
          />
          <SideNote
            label="LATENCY"
            sub="end-to-end"
            note="~50ms circuit · Playwright ~2s · Midjourney generation 30–60s"
          />
          <SideNote
            label="COST"
            sub="infra"
            note="Vercel free · Railway ~$5/mo · IBM Quantum free · Anthropic per-call"
          />
        </div>

      </div>
    </main>
  )
}

function Row({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center">
      {children}
    </div>
  )
}

function Arrow({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center my-1">
      <div className="w-px h-4 bg-[#c8d4b4]" />
      <span className="text-[9px] tracking-widest uppercase text-[#a8b89a] px-2 py-0.5 bg-[#f7f9f4] border border-[#e0e8d4] rounded-sm">
        {label}
      </span>
      <div className="w-px h-3 bg-[#c8d4b4]" />
      <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-[#c8d4b4]" />
    </div>
  )
}

function Node({
  label,
  sub,
  color,
  wide,
  children,
}: {
  label: string
  sub: string
  color: "stone" | "sage" | "amber"
  wide?: boolean
  children?: React.ReactNode
}) {
  const bg = color === "sage"
    ? "bg-[#f4f8f0] border-[#c8d8b4]"
    : color === "amber"
    ? "bg-[#fdf8f0] border-[#e8d8a4]"
    : "bg-[#f8f8f8] border-[#e0e0e0]"
  return (
    <div className={`border ${bg} rounded px-5 py-3 ${wide ? "w-[480px]" : "w-56"}`}>
      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-xs font-bold tracking-widest text-[#4a6a3a]">{label}</span>
        <span className="text-[9px] tracking-widest text-[#a8b89a] uppercase">{sub}</span>
      </div>
      {children && <div className="mt-2 flex flex-col gap-1">{children}</div>}
    </div>
  )
}

function Step({ n, text }: { n: number | string; text: string }) {
  return (
    <div className="flex gap-2 items-start">
      <span className="text-[9px] text-[#8aaa6e] mt-0.5 shrink-0">{n}.</span>
      <span className="text-[10px] text-[#6a7a5a] leading-relaxed">{text}</span>
    </div>
  )
}

function SideNote({ label, sub, note }: { label: string; sub: string; note: string }) {
  return (
    <div className="flex-1">
      <p className="text-[10px] font-bold tracking-widest text-[#4a6a3a] uppercase">{label}</p>
      <p className="text-[9px] tracking-widest text-[#a8b89a] uppercase mb-1">{sub}</p>
      <p className="text-[10px] text-[#8a9a7a] leading-relaxed">{note}</p>
    </div>
  )
}
