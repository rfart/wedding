import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { getWishes, addWish } from "@/lib/googleSheets";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const wishes = await getWishes();
    return NextResponse.json(
      { wishes },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
  } catch {
    return NextResponse.json({ wishes: [] });
  }
}

export async function POST(req: Request) {
  try {
    const { name, attendance, message } = await req.json();
    if (!name?.trim() || !attendance?.trim()) {
      return NextResponse.json(
        { error: "Nama dan konfirmasi kehadiran harus diisi." },
        { status: 400 }
      );
    }
    await addWish(name.trim(), attendance.trim(), (message ?? "").trim());
    try {
      revalidateTag("wishes", { expire: 0 });
    } catch {
      // ignore
    }
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Failed to add wish:", error);
    return NextResponse.json(
      { error: "Gagal menyimpan pesan." },
      { status: 500 }
    );
  }
}
