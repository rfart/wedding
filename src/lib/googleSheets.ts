import { google } from "googleapis";
import { unstable_cache } from "next/cache";

export type Wish = {
  timestamp: string;
  name: string;
  message: string;
};

function getAuth() {
  const privateKey = (process.env.GOOGLE_PRIVATE_KEY ?? "").replace(
    /\\n/g,
    "\n"
  );
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: privateKey,
    },
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
    range: "Sheet1!A2:C",
  });

  const rows = res.data.values ?? [];
  const wishes: Wish[] = rows
    .filter((r) => r[1] && r[2])
    .map((r) => ({ timestamp: r[0] ?? "", name: r[1], message: r[2] }));

  return wishes.reverse();
}

export const getWishes = unstable_cache(fetchWishes, ["wishes"], {
  revalidate: 30,
});

export async function addWish(name: string, message: string): Promise<void> {
  const sheetId = process.env.GOOGLE_SHEETS_SHEET_ID;
  if (!sheetId) throw new Error("GOOGLE_SHEETS_SHEET_ID not configured");

  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });
  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: "Sheet1!A:C",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[new Date().toISOString(), name, message]],
    },
  });
}
