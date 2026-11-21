import { google } from "googleapis";
import { unstable_cache } from "next/cache";

export type Wish = {
  timestamp: string;
  name: string;
  attendance: string;
  message: string;
};

function getAuth() {
  const privateKey = (process.env.GOOGLE_PRIVATE_KEY ?? "").replace(
    /\\n/g,
    "\n"
  );
  return new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

async function fetchWishes(): Promise<Wish[]> {
  const sheetId = process.env.GOOGLE_SHEETS_SHEET_ID;
  if (!sheetId) return [];

  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: "Wishes!A2:D",
  });

  const rows = res.data.values ?? [];
  const wishes: Wish[] = rows
    .filter((r) => r[1] && r[1].trim() && r[1].toLowerCase() !== "name")
    .map((r) => {
      const isAttendanceCol = r[2] === "Hadir" || r[2] === "Tidak Hadir";
      const attendance = isAttendanceCol ? r[2] : "";
      const message = isAttendanceCol ? (r[3] ?? "") : (r[2] ?? "");
      return { timestamp: r[0] ?? "", name: r[1], attendance, message };
    });

  return wishes.reverse();
}

export const getWishes = unstable_cache(fetchWishes, ["wishes"], {
  revalidate: 10,
  tags: ["wishes"],
});

export async function addWish(name: string, attendance: string, message: string): Promise<void> {
  const sheetId = process.env.GOOGLE_SHEETS_SHEET_ID;
  if (!sheetId) throw new Error("GOOGLE_SHEETS_SHEET_ID not configured");

  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });

  // Ensure header row exists so append never lands on row 1
  const check = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: "Wishes!A1:D1",
  });
  const hasHeader =
    check.data.values &&
    check.data.values.length > 0 &&
    check.data.values[0]?.some((val) => typeof val === "string" && val.trim().length > 0);

  if (!hasHeader) {
    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range: "Wishes!A1:D1",
      valueInputOption: "RAW",
      requestBody: {
        values: [["timestamp", "name", "attendance", "message"]],
      },
    });
  }

  // Use insertDataOption: "INSERT_ROWS" to physically insert a new row
  // and prevent overwriting existing rows
  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: "Wishes!A:D",
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [[new Date().toISOString(), name, attendance, message]],
    },
  });
}
