import { NextResponse } from "next/server";
import { getWishes, addWish } from "@/lib/googleSheets";

export async function GET() {
  try {
    const wishes = await getWishes();
    return NextResponse.json({ wishes });
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
    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Gagal menyimpan pesan." },
      { status: 500 }
    );
  }
}
