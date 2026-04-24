import { NextRequest, NextResponse } from "next/server";

const REPLICATE_API = "https://api.replicate.com/v1";
const MODEL = "lucataco/dreamshaper-xl-turbo";

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  if (!prompt?.trim()) {
    return NextResponse.json({ error: "Prompt required" }, { status: 400 });
  }

  const token = process.env.REPLICATE_API_TOKEN;
  if (!token) {
    return NextResponse.json({ error: "Missing API token" }, { status: 500 });
  }

  // Start prediction
  const createRes = await fetch(`${REPLICATE_API}/models/${MODEL}/predictions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Prefer: "wait=30",
    },
    body: JSON.stringify({
      input: {
        prompt,
        negative_prompt: "ugly, blurry, low quality, text, watermark, signature, deformed, disfigured",
        width: 768,
        height: 1152,
        num_inference_steps: 6,
        guidance_scale: 2.0,
        scheduler: "DPM++ SDE Karras",
      },
    }),
  });

  if (!createRes.ok) {
    const err = await createRes.text();
    return NextResponse.json({ error: err }, { status: createRes.status });
  }

  const prediction = await createRes.json();

  // If "Prefer: wait" already resolved it, return immediately
  if (prediction.status === "succeeded") {
    const url = Array.isArray(prediction.output) ? prediction.output[0] : prediction.output;
    return NextResponse.json({ url });
  }

  const id = prediction.id;

  // Poll until done (max 90s)
  const deadline = Date.now() + 90_000;
  while (Date.now() < deadline) {
    await new Promise((r) => setTimeout(r, 2000));

    const pollRes = await fetch(`${REPLICATE_API}/predictions/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const poll = await pollRes.json();

    if (poll.status === "succeeded") {
      const url = Array.isArray(poll.output) ? poll.output[0] : poll.output;
      return NextResponse.json({ url });
    }
    if (poll.status === "failed" || poll.status === "canceled") {
      return NextResponse.json({ error: poll.error ?? "Generation failed" }, { status: 500 });
    }
  }

  return NextResponse.json({ error: "Timed out waiting for image" }, { status: 504 });
}
