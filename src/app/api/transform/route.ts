import { NextRequest, NextResponse } from "next/server";

const QISKIT_URL = process.env.QISKIT_SERVICE_URL ?? "http://localhost:8000";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt?.trim()) {
      return NextResponse.json({ error: "Prompt required" }, { status: 400 });
    }

    const res = await fetch(`${QISKIT_URL}/transform`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    if (!res.ok) {
      throw new Error(`Qiskit service error: ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("[/api/transform]", err);
    return NextResponse.json(
      { error: "Quantum transform failed" },
      { status: 500 }
    );
  }
}
