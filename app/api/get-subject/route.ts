import { NextResponse } from "next/server";
import { getSubject } from "../../action";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const message = (url.searchParams.get("message") ?? "").trim();

    if (!message) {
      return NextResponse.json({ error: "missing message" }, { status: 400 });
    }

    const subject = await getSubject(message);
    return NextResponse.json({ subject: subject.length > 0 ? subject : null });
  } catch (err) {
    console.error("/api/get-subject error", err);
    return NextResponse.json({ error: "internal error" }, { status: 500 });
  }
}
